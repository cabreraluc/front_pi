import React from "react";
import {
  filterBd,
  getPokemons,
  filterApi,
  orderByAttackAsc,
  orderByAttackdsc,
  orderAsc,
  orderDsc,
  setPage,
  getTypes,
  filterByType,
  filterByType_,
  restorePokemons,
} from "../actions";
import { deletePokemons } from "../actions";
import { connect } from "react-redux";
import Cards from "./Cards";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { Link } from "react-router-dom";
import Message from "./Message";
import Loader from "./Loader";
import styles from "./ModulesCss/MainPage.module.css";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoIosOptions } from "react-icons/io";
import Swal from "sweetalert2";
import MainPageSliceOptions from "./MainPageSliceOptions";

let PokemonsPorPage = 12;

function MainPage(props) {
  let CountOf = Math.ceil(props.state.pokemonFiltered.length / PokemonsPorPage);
  let arrCountOf = [];
  arrCountOf = props.state.pokemonFiltered.slice(0, CountOf);

  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(PokemonsPorPage);
  const [current, setCurrent] = useState(1);
  const [tipos, setTipos] = useState({ info: [] });
  const [sendToTrash, setSendToTrash] = useState({ lista: [] });
  const [showOptions, setShowOptions] = useState(false);

  React.useEffect(() => {
    props.getPokemons();
    props.getTypes();
  }, []);

  const handlerNext = () => {
    if (current < CountOf) {
      setNum1(num1 + PokemonsPorPage);
      setNum2(num2 + PokemonsPorPage);
      setCurrent(current + 1);
    }
  };

  const handlerPrev = () => {
    if (current >= 2) {
      setNum1(num1 - PokemonsPorPage);
      setNum2(num2 - PokemonsPorPage);
      setCurrent(current - 1);
    }
  };

  const handleReset = () => {
    setNum1(0);
    setNum2(PokemonsPorPage);
    setCurrent(1);
  };

  const handleRestorePokemons = () => {
    let timerInterval;
    Swal.fire({
      title: "Restoring Pokemons deleted...",
      html: "",
      timer: 2000,
      timerProgressBar: false,
      didOpen: () => {
        props.restorePokemons();
        props.state.onePokemon = {};
        Swal.showLoading();
        const b = Swal.getHtmlContainer().querySelector("b");
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft();
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
        window.location.reload();
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
  };

  const tiposSelector = (tipo) => {
    setTipos({ ...tipos, info: [...tipos.info, tipo] });
    props.filterByType(tipo);
  };

  const sendToTrashFilter = (name) => {
    setSendToTrash({
      ...sendToTrash,
      lista: sendToTrash.lista.filter((element) => element !== name),
    });
    console.log(sendToTrash.lista);
  };

  const restSelector = (tipo) => {
    if (tipo === "db") {
      props.filterBd();
      handleReset();
    }
    if (tipo === "api") {
      props.filterApi();
    }
    if (tipo === "fuerte") {
      props.orderByAttackAsc();
    }
    if (tipo === "debil") {
      props.orderByAttackDsc();
    }
    if (tipo === "a-z") {
      props.orderAsc();
    }
    if (tipo === "z-a") {
      props.orderDsc();
    }
  };

  const handlerDelete = () => {
    Swal.fire({
      title: "Are you want to send that pokemons to recycle bin?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        deletePokemons(sendToTrash.lista);

        let timerInterval;
        Swal.fire({
          title: "Sending to trash!",
          html: "",
          timer: 2000,
          timerProgressBar: false,
          didOpen: () => {
            Swal.showLoading();
            const b = Swal.getHtmlContainer().querySelector("b");
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft();
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
            window.location.reload();
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
      }
    });
  };

  const handlerSendToTrash = (data) => {
    if (!sendToTrash.lista.includes(data)) {
      setSendToTrash({ ...sendToTrash, lista: [...sendToTrash.lista, data] });
    }
  };

  return (
    <div id="container" className={styles.container}>
      <div className={styles.content}>
        <MainPageSliceOptions
          setShowOptions={setShowOptions}
          showOptions={showOptions}
          restSelector={restSelector}
          tiposSelector={tiposSelector}
          tips={tipos}
        ></MainPageSliceOptions>
        <div className={styles.header}>
          <button
            className={styles.buttonsHeader_options}
            onClick={() => setShowOptions(!showOptions)}
          >
            <IoIosOptions />
          </button>

          <SearchBar handleReset={handleReset}></SearchBar>
        </div>

        <div>
          <div className={styles.delete_box}>
            {sendToTrash.lista.length ? (
              <button
                onClick={() => {
                  handlerDelete();
                  setSendToTrash({ lista: [] });
                }}
                className={styles.boton_delete}
              >
                send to trash
              </button>
            ) : (
              false
            )}
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.container_trash_box}>
            <div className={styles.trash_box}>
              <button
                onClick={() => {
                  props.getPokemons();
                  props.state.onePokemon = {};
                }}
                className={styles.trash}
              >
                Show all!
              </button>
              <Link to="/Trash">
                <button
                  className={styles.trash}
                  onClick={() => (props.state.onePokemon = {})}
                >
                  <FaRegTrashAlt /> Recycle bin
                </button>
              </Link>
            </div>
          </div>

          <div className={styles.cards_arrows}>
            {current >= 2 ? (
              <button
                onClick={handlerPrev}
                className={styles.buttonsNavegation}
              >
                <p className={styles.textInButtonNavegation}>{`<`}</p>
              </button>
            ) : (
              <button
                onClick={handlerPrev}
                className={styles.buttonsNavegation}
              >
                <p className={styles.textInButtonNavegation_disabled}>{`<`}</p>
              </button>
            )}
            {
              <div className={styles.cards}>
                {props.state.onePokemon.message ? (
                  <div>
                    <Message color={"white"}></Message>
                  </div>
                ) : props.state.allPokemons.length === 0 &&
                  props.state.tipos.length === 0 ? (
                  <div>
                    <Loader />
                  </div>
                ) : (
                  props.state.pokemonFiltered
                    .slice(num1, num2)
                    .map((element) => (
                      <div id="card">
                        <Cards
                          sendToTrashFilter={sendToTrashFilter}
                          lista={sendToTrash.lista}
                          handlerSendToTrash={handlerSendToTrash}
                          data={element}
                          key={element.id}
                        />
                      </div>
                    ))
                )}
              </div>
            }
            {current < CountOf ? (
              <button
                onClick={handlerNext}
                className={styles.buttonsNavegation}
              >
                {" "}
                <p className={styles.textInButtonNavegation}>{`>`}</p>
              </button>
            ) : (
              <button
                onClick={handlerNext}
                className={styles.buttonsNavegation}
              >
                {" "}
                <p className={styles.textInButtonNavegation_disabled}>{`>`}</p>
              </button>
            )}
          </div>
        </div>

        <div className={styles.numbers_nav_box}>
          {arrCountOf.map((e, i) => (
            <button
              onClick={() => {
                setNum1((i + 1) * PokemonsPorPage - PokemonsPorPage);
                setNum2((i + 1) * PokemonsPorPage);
                setCurrent(i + 1);
              }}
              className={styles.buttonsNavigation}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <div className={styles.footer_info}>
          <p>
            Hello! my name is Lucas Cabrera, welcome to my Pokedex, im a student
            from Argentina if you want to contact me, i leave my contact below{" "}
            <br></br>
            <b>cabreralucaspatricio@gmail.com</b>
          </p>
          <p></p>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    state: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTypes: () => {
      dispatch(getTypes());
    },
    restorePokemons: () => {
      dispatch(restorePokemons());
    },
    getPokemons: () => {
      dispatch(getPokemons());
    },
    filterBd: () => {
      dispatch(filterBd());
    },
    filterApi: () => {
      dispatch(filterApi());
    },
    orderByAttackAsc: () => {
      dispatch(orderByAttackAsc());
    },
    orderByAttackDsc: () => {
      dispatch(orderByAttackdsc());
    },
    orderAsc: () => {
      dispatch(orderAsc());
    },
    orderDsc: () => {
      dispatch(orderDsc());
    },
    setPage: () => {
      dispatch(setPage());
    },
    filterByType: (data) => {
      dispatch(filterByType(data));
    },
    filterByType_: (data) => {
      dispatch(filterByType_(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
