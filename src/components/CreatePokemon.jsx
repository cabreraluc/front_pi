import { getPokemons, postPokemon, getTypes } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./ModulesCss/createPokemon.module.css";
import axios from "axios";
import Swal from "sweetalert2";

export default function CreateTuPokemon() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  function ValidURL(string) {
    var res = string.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    return res !== null;
  }

  const OnlyNumbers = /^[0-9]*$/;
  const onlyCharacters = /^[a-zA-Z\s]+$/;

  let [formulario, setFormulario] = useState({
    name: "",
    health: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    type: [],
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/768px-Pok%C3%A9_Ball_icon.svg.png",
  });
  let [error, setError] = useState({});
  let [loading, setLoading] = useState(false);

  const subirAlState = (event) => {
    if (event.target.name == "name") {
      setFormulario((prevState) => {
        return {
          ...prevState,
          [event.target.name]: event.target.value,
        };
      });
    }

    if (
      event.target.name == "name" &&
      onlyCharacters.test(event.target.value) &&
      event.target.value.length < 15
    ) {
      setError((prevState) => {
        return {
          ...prevState,
          [event.target.name]: "",
        };
      });
    }

    if (
      event.target.name == "name" &&
      !onlyCharacters.test(event.target.value)
    ) {
      setError((prevState) => {
        return {
          ...prevState,
          [event.target.name]: "Names with numbers are not allowed",
        };
      });
      console.log(error.name);
    }

    if (event.target.name == "name" && event.target.value.length > 15) {
      setError((prevState) => {
        return {
          ...prevState,
          [event.target.name]: "The maximum number of characters is 15",
        };
      });
      console.log(error.name);
    }

    if (event.target.name == "name" && event.target.value === "") {
      setError((prevState) => {
        return {
          ...prevState,
          [event.target.name]: "Write a name",
        };
      });
      console.log(error.name);
    }

    if (
      OnlyNumbers.test(event.target.value) &&
      event.target.value.length < 5 &&
      event.target.value !== "" &&
      event.target.name !== "name"
    ) {
      setFormulario((prevState) => {
        return {
          ...prevState,
          [event.target.name]: Number(event.target.value),
        };
      });
    }
  };

  const load = () => {
    let timerInterval;
    Swal.fire({
      title: "Loading...",
      html: "",
      timer: 2000,
      timerProgressBar: false,
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss !== Swal.DismissReason.timer) {
        load();
      }
    });
  };

  const uploadImage = async (e) => {
    const files = e.target.files[0];
    const data = new FormData();

    data.append("file", files);
    data.append("upload_preset", "artket");
    data.append("api_key", "194228613445554");
    load();

    const res = await axios
      .post("https://api.cloudinary.com/v1_1/daxy95gra/image/upload", data, {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      })
      .then((response) => {
        const imagen = response.data;
        const fileURL = imagen;
        setFormulario({ ...formulario, img: fileURL.secure_url });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    dispatch(getTypes());
  }, []);

  const enviar = () => {
    if (error.name === "" && formulario.name !== "") {
     postPokemon(formulario);
      let timerInterval;
      Swal.fire({
        title: "Creating...",
        html: "",
        timer: 2000,
        timerProgressBar: false,
        didOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          window.location.href = "/MainPage";
          clearInterval(timerInterval);
        },
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("I was closed by the timer");
        }
      });
    } else if (formulario.name === "") {
      Swal.fire({
        title: "Write a name for you Pokemon! ",
        showCancelButton: false,
        confirmButtonText: "Ok",
      });
    } else {
      Swal.fire({
        title: "Wrong name format ",
        showCancelButton: false,
        confirmButtonText: "Ok",
      });
    }
  };

  const handleTypes = (event) => {
    if (event.target.checked === true) {
      setFormulario({
        ...formulario,
        type: [...formulario.type, event.target.name],
      });
    } else {
      setFormulario({
        ...formulario,
        type: formulario.type.filter((tipo) => tipo !== event.target.name),
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link to="/MainPage">
          <button
            onClick={() => dispatch(getPokemons())}
            className={styles.buttons}
          >
            Return to main page
          </button>
        </Link>
      </div>
      <div>
        <div className={styles.body}>
          <div className={styles.inputs_container}>
            <form>
              <div className={styles.inputs}>
                <span className={styles.text}>Name*</span>
                <input
                  value={formulario.name}
                  name="name"
                  onChange={(event) => {
                    subirAlState(event);
                  }}
                  className={styles.inputText}
                />
                <span className={styles.text} style={{ color: "red" }}>
                  {error.name}
                </span>
                <span className={styles.text}>Heatlh</span>
                <input
                  value={formulario.health}
                  name="health"
                  onChange={(event) => {
                    subirAlState(event);
                  }}
                  className={styles.inputText}
                />
                <span className={styles.text}>Attack damage</span>
                <input
                  value={formulario.attack}
                  name="attack"
                  onChange={(event) => {
                    subirAlState(event);
                  }}
                  className={styles.inputText}
                />
                <span className={styles.text}>Defense</span>
                <input
                  value={formulario.defense}
                  name="defense"
                  onChange={(event) => {
                    subirAlState(event);
                  }}
                  className={styles.inputText}
                />
                <span className={styles.text}>Speed</span>
                <input
                  value={formulario.speed}
                  name="speed"
                  onChange={(event) => {
                    subirAlState(event);
                  }}
                  className={styles.inputText}
                />
                <span className={styles.text}>Height</span>
                <input
                  value={formulario.height}
                  name="height"
                  onChange={(event) => {
                    subirAlState(event);
                  }}
                  className={styles.inputText}
                />
                <span className={styles.text}>Weight</span>
                <input
                  value={formulario.weight}
                  name="weight"
                  onChange={(event) => {
                    subirAlState(event);
                  }}
                  className={styles.inputText}
                />
                <span className={styles.text}>Picture</span>
                <input
                  type="file"
                  name="img"
                  onChange={(event) => {
                    uploadImage(event);
                  }}
                  className={styles.inputText}
                />
              </div>
            </form>
          </div>

          <div className={styles.types}>
            <span className={styles.text_types}>Select types</span>

            <div className={styles.types_box}>
              {state.tipos.map((element) => (
                <div key={element.name} className={styles.types_items}>
                  <span>{element.name}</span>
                  <input
                    type="checkbox"
                    name={element.name}
                    onClick={(event) => {
                      handleTypes(event);
                    }}
                  ></input>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button onClick={enviar} type="submit" className={styles.button_create}>
          Create!
        </button>
      </div>
    </div>
  );
}
