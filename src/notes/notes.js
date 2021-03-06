class $NoteCard {
  constructor(id, text) {
    this.id = id;
    this.text = text;
    // Disabled temporary
    // this.title = title;

    this.element = document.createElement('div');
    this.element.classList.add('divNoteCard', 'card', 'notes-list-item');
    this.element.innerHTML = `
      <div class="card-header">
        Note ${id}
        <button id="delete-card-${id}" type="button" class="btnDeleteCard btn btn-sm btn-outline-danger">Delete</button>
      </div>
      <div class="card-body">
        <textarea class="form-control card-text" rows="3" name="note${id}">${text}</textarea>
      </div>
    `;

    // Disabled temporary
    // <input type="text" class="form-control card-title" value="${title}"></input>
    // <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
  }

  setOnDeleteButton(handler) {
    const deleteButton = this.element.getElementsByClassName('btnDeleteCard').item(0);

    if (deleteButton) {
      deleteButton.addEventListener('click', () => handler(this.element));
    }

    return this;
  }

  getElement() {
    return this.element;
  }
}

const replaceChildren = (parent, ...children) => {
  parent.innerHTML = '';

  children.forEach((node) => parent.appendChild(node));
};

document.addEventListener('DOMContentLoaded', async () => {
  const divNotes = document.getElementById('notes-list-form-inner');
  const btnAddNote = document.getElementById('btn-add-note');

  btnAddNote.addEventListener('click', () => {
    const id = divNotes.childElementCount + 1;

    divNotes.insertAdjacentElement(
      'beforeend', 
      new $NoteCard(id, 'Note text')
        .setOnDeleteButton((element) => element.remove())
        .getElement()
    );
  });

  replaceChildren(
    divNotes, 
    new $NoteCard(1, 'Note text')
      .setOnDeleteButton((element) => element.remove())
      .getElement()
  );

  const response = await fetch('/notes/notes.php?json=true');
  const notes = await response.json();

  replaceChildren(
    divNotes,
    ...notes.map((note, index) => (
        new $NoteCard(index + 1, note)
        .setOnDeleteButton((element) => element.remove())
        .getElement()
      )
    )
  )
});
