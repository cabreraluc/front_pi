import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrash } from "../actions";
import { deleteFromTrash, restoreFromTrash } from "../actions";
import { VscClose } from "react-icons/vsc";
import { VscDebugRestart } from "react-icons/vsc";
import styles from "./ModulesCss/Trash.module.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Trash() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(getTrash())
  })

  function handlerDelete(element) {
    Swal.fire({
      title: "Are you sure you want to delete permanently this pokemon?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        deleteFromTrash([element.name]);

        let timerInterval;
        Swal.fire({
          title: "Deleting...",
          html: "",
          timer: 2000,
          timerProgressBar: false,
          didOpen: () => {
            dispatch(getTrash());
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
  }

  function handlerRestore(element) {
    Swal.fire({
      title: "Restore this pokemon?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        restoreFromTrash([element.name]);

        let timerInterval;
        Swal.fire({
          title: "Restoring...",
          html: "",
          timer: 2000,
          timerProgressBar: false,
          didOpen: () => {
            dispatch(getTrash());
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
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link to="/MainPage">
          <button className={styles.buttonsHeader}>Return to main page</button>
        </Link>
      </div>
      <div className={styles.body}>
        <div className={styles.card_box}>
          {!state.trashPokemons.length ? (
            <div className={styles.empty}>Empty</div>
          ) : (
            state.trashPokemons.map((element) => {
              return (
                <div>
                  <div className={styles.card}>
                    <div className={styles.img_box}>
                      <img
                        className={styles.img}
                        src={element.img}
                        alt="pokemon_img"
                      />
                    </div>
                    <div className={styles.card_data}>
                      <h3 className={styles.name}>{element.name}</h3>
                      <h3 className={styles.types}>PokeNumber: {element.id}</h3>
                    </div>
                    <div className={styles.buttons_card}>
                      <button
                        onClick={() => {
                          handlerDelete(element);
                        }}
                        className={styles.button_delete_pressed}
                      >
                        <VscClose />
                      </button>
                      <button
                        onClick={() => {
                          handlerRestore(element);
                        }}
                        className={styles.button_restore}
                      >
                        <VscDebugRestart />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
