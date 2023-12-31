const factsList = data.facts;
const textBox = document.createElement("div");

const body = document.querySelector("body");
body.append(textBox);

const generateButton = document.getElementById("fact-button");
generateButton.addEventListener("click", createFactDiv);
generateButton.disabled = true;

function hasUser(event) {
  event.preventDefault();
  const name = document.querySelector("input");
  if (name.value) {
    const confirmed = confirm(`Is ${name.value} your name?`);
    if (confirmed) {
      generateButton.disabled = false;
      const submitButton = document.getElementById("submit");
      submitButton.disabled = true;
      name.disabled = true;
      window.alert("You can now generate facts!");
      const template = document.getElementById("name-template");
      const templateContent = template.content.cloneNode(true);
      templateContent.querySelector(
        "div"
      ).textContent = `Welcome, ${name.value}`;
      generateButton.parentNode.insertBefore(templateContent, generateButton);
      //   body.insertBefore(templateContent, body.childNodes[2]);
    }
  }
}

function createFactDiv() {
  const factDiv = document.createElement("div");
  factDiv.classList.add("factdiv");
  const fact = document.createElement("p");
  fact.classList.add("fact");
  fact.textContent = generateFact();

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", (e) => deleteFact(e));

  const highlightButton = document.createElement("button");
  highlightButton.textContent = "Highlight";
  highlightButton.addEventListener("click", (e) => highlight(e));
  factDiv.appendChild(fact);

  const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("buttondiv");
    factDiv.appendChild(deleteButton);
    factDiv.appendChild(highlightButton);
//   buttonDiv.appendChild(deleteButton);
//   buttonDiv.appendChild(highlightButton);
//   factDiv.appendChild(buttonDiv);
  body.appendChild(factDiv);
}

function generateFact() {
  const randomNumber = Math.floor(Math.random() * factsList.length);
  const fact =
    factsList[randomNumber].charAt(0).toUpperCase() +
    factsList[randomNumber].slice(1);
  return fact;
}

function deleteFact(e) {
  const allFacts = document.querySelectorAll(".fact");
  const selectedFact = e.target.parentNode.firstChild;
  for (let fact of allFacts) {
    if (selectedFact.isEqualNode(fact)) {
      body.removeChild(fact.parentNode);
    }
  }
}

function highlight(e) {
  const allFacts = document.querySelectorAll(".fact");
  const selectedFact = e.target.parentNode.firstChild;
  for (let fact of allFacts) {
    if (selectedFact.isEqualNode(fact)) {
      if (fact.style.backgroundColor === "yellow") {
        fact.style.backgroundColor = "transparent";
        e.target.textContent = "Highlight";
      } else {
        console.log("highlighted");
        fact.style.backgroundColor = "yellow";
        e.target.textContent = "Unhighlight";
      }
    }
  }
}
