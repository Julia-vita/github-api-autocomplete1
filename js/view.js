export default class View {
  constructor() {
    this.app = document.querySelector(".page");
    this.header = this.createElement("header", "page__header");
    this.title = this.createElement("h1", "title");
    this.title.textContent = "GitHub-API-Autocomplete";
    this.header.appendChild(this.title);
    this.app.appendChild(this.header);

    this.main = this.createElement("main", "page__main");
    this.inputContainer = this.createElement("div", "search-container");
    this.repositoriesInfo = this.createElement("div", "repositories-info");
    this.input = this.createElement("input", "search-container__input");
    this.input.setAttribute("type", "text");
    this.input.setAttribute("id", "searchInput");
    this.input.setAttribute("autocomplete", "on");
    this.input.setAttribute("placeholder", "Введите имя репозитория");
    this.resultsContainer = this.createElement("div", "results-container");
    this.inputContainer.appendChild(this.input);
    this.inputContainer.appendChild(this.resultsContainer);
    this.main.appendChild(this.inputContainer);
    this.main.appendChild(this.repositoriesInfo);
    this.app.appendChild(this.main);
  }

  createElement(elTagName, ...elClassNames) {
    const el = document.createElement(elTagName);
    if (elClassNames) {
      el.classList.add(...elClassNames);
    }
    return el;
  }

  displayResults(repositories) {
    this.resultsContainer.innerHTML = "";
    repositories.forEach((repo) => {
      const item = this.createElement("div", "repositories-item");
      const link = this.createElement("a");
      link.setAttribute("href", repo.html_url);
      link.setAttribute("target", "_blank");
      link.textContent = repo.full_name;
      item.appendChild(link);
      item.addEventListener("click", (event) => {
        event.preventDefault();
        this.addRepositoryToContainer(repo);
        this.input.value = "";
        this.resultsContainer.innerHTML = "";
      });
      this.resultsContainer.appendChild(item);
    });
  }

  addRepositoryToContainer(repo) {
    const item = this.createElement("div", "repository-info-item");
    const link = this.createElement("a", "repository-info-items__link");
    link.setAttribute("href", repo.html_url);
    link.setAttribute("target", "_blank");

    const wrapper = this.createElement("div");
    const name = this.createElement("div");
    name.textContent = `Name: ${repo.name}`;
    wrapper.appendChild(name);
    const owner = this.createElement("div");
    owner.textContent = `Owner: ${repo.owner.login}`;
    wrapper.appendChild(owner);
    const stars = this.createElement("div");
    stars.textContent = `Stars: ${repo.stargazers_count}`;
    wrapper.appendChild(stars);
    link.appendChild(wrapper);

    const removeButton = this.createElement("button", "remove-button");
    removeButton.setAttribute("aria-label", "Удалить");
    removeButton.textContent = "✖";
    removeButton.addEventListener("click", () => {
      item.remove();
    });
    item.appendChild(link);
    item.appendChild(removeButton);
    this.repositoriesInfo.appendChild(item);
  }
  
}
