import { getMedia, getRamdonNumber } from "belugs";
import "./sass/style.scss";

let students = null;

const init = _students => {
  students = _students;
  createDomIntoTable(_students);
  addListenerToButton();
};

const createDomIntoTable = students => {
  const str = students
    .map((student, i) => {
      return `
            <tr>
                <td>${student.nome}</td>
                ${student.notas.map(nota => `<td> ${nota} </td>`).join("")}
                <td>${getMedia(...student.notas)} </td>
            </tr>
            `;
    })
    .join("");
  document.querySelector("#content-students").innerHTML = str;
};

const createDomIntoList = luckyStudents => {
  const str = luckyStudents
    .map(s => {
      return `
                <li class="list-group-item" id="student-${s.i}">${s.nome} <span style="float:right">${s.media} </span></li>
            `;
    })
    .join("");

  document.querySelector("#results ul").innerHTML = str;
};

const addListenerToButton = function() {
  const $btn = document.querySelector("#btn-init");
  $btn.removeAttribute("disabled");
  $btn.addEventListener("click", e => {
    const _students = Array.from(students);
    let luckyStudents = [];

    while (luckyStudents.length < 5) {
      let nRandon = getRamdonNumber(0, _students.length - 1);

      let student = _students.splice(nRandon, 1);
      luckyStudents.push(student[0]);
    }

    let medias = [];

    luckyStudents.map((ls, i) => {
      medias[i] = ls.media;
      ls.i = i;
      return ls;
    });

    createDomIntoList(luckyStudents);

    const maxValue = Math.max(...medias);

    const studentsWinner = luckyStudents.filter((student, i) => {
      return student.media === maxValue;
    });

    if (studentsWinner.length === 1) {
      showsTheWinner(studentsWinner[0]);
    } else {
      let nLucky = getRamdonNumber(0, studentsWinner.length - 1);
      showsTheWinner(studentsWinner[nLucky]);
    }
  });
};

const showsTheWinner = luckyStudent => {
  document.querySelector(`#student-${luckyStudent.i}`).style.backgroundColor =
    "green";
};

const getStudents = async () => {
  const url_json = "https://serfrontend.com/fakeapi/alunos.json";
  const response = await fetch(url_json);
  let data = await response.json();

  data.map(s => {
    s.media = parseFloat(getMedia(...s.notas));
  });

  if (response.status !== 200) {
    throw Error(data.detail);
  }
  return data;
};
getStudents()
  .then(students => init(students))
  .catch(err => console.error(err));
