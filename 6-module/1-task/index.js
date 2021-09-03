/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.data = rows;
    this.elem = this.render(rows);
  }

  render(rows) {
    let tab = document.createElement("table");
    tab.innerHTML =
      `<thead>
    <tr>
      <th>Имя</th>
      <th>Возраст</th>
      <th>Зарплата</th>
      <th>Город</th>
      <th></th>
    </tr>
  </thead>` +
      this.data
        .map((newItem) => {
          return `
    <tbody>
      <tr>
        <td>${newItem.name}</td>
        <td>${newItem.age}</td>
        <td>${newItem.salary}</td>
        <td>${newItem.city}</td>
        <td><button>X</button></td>
      </tr>
    </tbody>`;
        })
        .join("");
    let buttons = tab.querySelectorAll("button");
    for (let btn of buttons) {
      btn.addEventListener("click", (event) =>
        event.target.closest("tr").remove()
      );
    }
    return tab;
  }
}
