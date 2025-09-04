# DAY 1: TO-Dos and Notes

## From Discord ("day-1" channel)

- After `brew install python`, we need to execute `source ~/.zshrc` (on modern MacOS)
THEN `python3 --version` will return something like Python 3.13.5 (or later).
`pip3 --version` will return
`pip 25.1.1 from /opt/homebrew/lib/python3.13/site-packages/pip (python 3.13)`

### MISSING: Creating a Project

Looking at the current Day-1 content, I see that we don't have instructions to actually create a project--which we need to do before we can create a virtual environment.

### Create Virtual Environment

**AAAAH!! Here is where Poetry comes in ...** This solves both the "create a project" and dealing with virtual environments issue. SO:

Let’s go step-by-step and create a brand-new Python project using [Poetry](https://python-poetry.org/). 

## 🚀 Step-by-Step: Creating a New Python Project with Poetry

## FIRST: 📦 Poetry Universal Install Guide

We use [Poetry](https://python-poetry.org) for Python dependency management.
Follow these steps to install it on **Windows, macOS, or Linux**:

### 1. Install Poetry

Run this in your terminal (PowerShell on Windows, Terminal on macOS/Linux):

```bash
curl -sSL https://install.python-poetry.org | python3 -
```

### 2. Add Poetry to your PATH (if not already)

If `poetry` is not found after install, add it to your PATH:

* **macOS/Linux (bash/zsh)** → add to `~/.bashrc` or `~/.zshrc`:

  ```bash
  export PATH="$HOME/.local/bin:$PATH"
  ```

* **Windows (PowerShell)** → add this to your PowerShell profile (`$PROFILE`):

  ```powershell
  $env:Path += ";$env:APPDATA\Python\Scripts"
  ```

Then restart your terminal.

### 3. Verify Installation

```bash
poetry --version
```

You should see the installed version number.

Quick sanity check (runs Python inside Poetry’s environment):

```bash
poetry run python -V
```

---

### 4. Create a Project

```bash
poetry new my_project
cd my_project
poetry install
```
This generates a standard project structure:

```
my_project/
├── pyproject.toml      # Project metadata + dependencies
├── README.md
├── my_project/         # Your source code lives here
│   └── __init__.py
├── tests/              # Default pytest-based test folder
│   └── __init__.py
└── .gitignore
```


---

### 2. Initialize Git (Optional, but recommended)

```bash
cd my_project
git init
git add .
git commit -m "Initial commit"
```

---

### 3. Configure Your Python Version

Inside `pyproject.toml`, Poetry will already have guessed a Python constraint. You can edit it:

```toml
[tool.poetry.dependencies]
python = "^3.11"
```

Or set it at project creation:

```bash
poetry new my_project --dependency python="^3.11"
```

---

### 4. Activate a Virtual Environment

Poetry automatically manages virtual envionments for each project.

```bash
poetry install    # creates the venv and installs dependencies
poetry shell      # activate the virtualenv
```

Now your shell is inside the environment.

---

### Aside: ⚖️ `poetry run` vs `poetry shell`

| Command                | What it does                                                                       | When to use it                                                                                                         | Pros                                                                                                                | Cons                                                                              |
| ---------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| **`poetry run <cmd>`** | Runs a single command inside the Poetry virtual environment (without entering it). | - Scripts & automation<br>- CI/CD pipelines<br>- One-off commands (`poetry run pytest`, `poetry run python script.py`) | ✅ No need to enter/exit a subshell<br>✅ Reproducible (works in scripts)<br>✅ Great for automation                   | ❌ Verbose (you must prefix each command)<br>❌ Less convenient for interactive dev |
| **`poetry shell`**     | Spawns a new subshell with the virtual environment activated.                      | - Day-to-day dev work<br>- When running multiple commands (`python`, `pytest`, `ipython`, etc.)                        | ✅ Natural workflow (`python`, `pytest` just work)<br>✅ Good for interactive debugging<br>✅ Prompt shows active venv | ❌ You must remember to `exit` when done<br>❌ Not ideal for scripts or automation  |

---

### 🟢 Best Practice

* **Developing interactively** → `poetry shell`
* **Running one-off commands or in scripts/CI** → `poetry run <cmd>`

---

👉 Think of it like:

* `poetry run` = **“just run this thing inside the venv.”**
* `poetry shell` = **“drop me into the venv until I’m done.”**

---

### 5. Add Dependencies

We will use Jupyter notebooks embedded in VS Code; this installs those dependencies in our project:

`poetry add --group dev ipykernel jupyter`

- The `--group dev` flag specifies (in our pyproject.toml file) that these are Development-only dependencies.

This seemingly simple installation command takes our project from an empty list of installed Python libraries (via `poetry show`) from an empty list to something like this:

```
anyio                     4.10.0         High-level concurrency and network...
appnope                   0.1.4          Disable App Nap on macOS >= 10.9
argon2-cffi               25.1.0         Argon2 for Python
argon2-cffi-bindings      25.1.0         Low-level CFFI bindings for Argon2
arrow                     1.3.0          Better dates & times for Python
asttokens                 3.0.0          Annotate AST trees with source cod...
async-lru                 2.0.5          Simple LRU cache for asyncio
attrs                     25.3.0         Classes Without Boilerplate
babel                     2.17.0         Internationalization utilities
beautifulsoup4            4.13.5         Screen-scraping library
bleach                    6.2.0          An easy safelist-based HTML-saniti...
certifi                   2025.8.3       Python package for providing Mozil...
cffi                      1.17.1         Foreign Function Interface for Pyt...
charset-normalizer        3.4.3          The Real First Universal Charset D...
comm                      0.2.3          Jupyter Python Comm implementation...
debugpy                   1.8.16         An implementation of the Debug Ada...
decorator                 5.2.1          Decorators for Humans
defusedxml                0.7.1          XML bomb protection for Python std...
executing                 2.2.1          Get the currently executing AST no...
fastjsonschema            2.21.2         Fastest Python implementation of J...
fqdn                      1.5.1          Validates fully-qualified domain n...
h11                       0.16.0         A pure-Python, bring-your-own-I/O ...
httpcore                  1.0.9          A minimal low-level HTTP client.
httpx                     0.28.1         The next generation HTTP client.
idna                      3.10           Internationalized Domain Names in ...
ipykernel                 6.30.1         IPython Kernel for Jupyter
ipython                   9.5.0          IPython: Productive Interactive Co...
ipython-pygments-lexers   1.1.1          Defines a variety of Pygments lexe...
ipywidgets                8.1.7          Jupyter interactive widgets
isoduration               20.11.0        Operations with ISO 8601 durations
jedi                      0.19.2         An autocompletion tool for Python ...
jinja2                    3.1.6          A very fast and expressive templat...
json5                     0.12.1         A Python implementation of the JSO...
jsonpointer               3.0.0          Identify specific nodes in a JSON ...
jsonschema                4.25.1         An implementation of JSON Schema v...
jsonschema-specifications 2025.4.1       The JSON Schema meta-schemas and v...
jupyter                   1.1.1          Jupyter metapackage. Install all t...
jupyter-client            8.6.3          Jupyter protocol implementation an...
jupyter-console           6.6.3          Jupyter terminal console
jupyter-core              5.8.1          Jupyter core package. A base packa...
jupyter-events            0.12.0         Jupyter Event System library
jupyter-lsp               2.3.0          Multi-Language Server WebSocket pr...
jupyter-server            2.17.0         The backend—i.e. core services, AP...
jupyter-server-terminals  0.5.3          A Jupyter Server Extension Providi...
jupyterlab                4.4.7          JupyterLab computational environment
jupyterlab-pygments       0.3.0          Pygments theme using JupyterLab CS...
jupyterlab-server         2.27.3         A set of server components for Jup...
jupyterlab-widgets        3.0.15         Jupyter interactive widgets for Ju...
lark                      1.2.2          a modern parsing library
markupsafe                3.0.2          Safely add untrusted strings to HT...
matplotlib-inline         0.1.7          Inline Matplotlib backend for Jupyter
mistune                   3.1.4          A sane and fast Markdown parser wi...
nbclient                  0.10.2         A client library for executing not...
nbconvert                 7.16.6         Converting Jupyter Notebooks (.ipy...
nbformat                  5.10.4         The Jupyter Notebook format
nest-asyncio              1.6.0          Patch asyncio to allow nested even...
notebook                  7.4.5          Jupyter Notebook - A web-based not...
notebook-shim             0.2.4          A shim layer for notebook traits a...
packaging                 25.0           Core utilities for Python packages
pandocfilters             1.5.1          Utilities for writing pandoc filte...
parso                     0.8.5          A Python Parser
pexpect                   4.9.0          Pexpect allows easy control of int...
platformdirs              4.4.0          A small Python package for determi...
prometheus-client         0.22.1         Python client for the Prometheus m...
prompt-toolkit            3.0.52         Library for building powerful inte...
psutil                    7.0.0          Cross-platform lib for process and...
ptyprocess                0.7.0          Run a subprocess in a pseudo terminal
pure-eval                 0.2.3          Safely evaluate AST nodes without ...
pycparser                 2.22           C parser in Python
pygments                  2.19.2         Pygments is a syntax highlighting ...
python-dateutil           2.9.0.post0    Extensions to the standard Python ...
python-json-logger        3.3.0          JSON Log Formatter for the Python ...
pyyaml                    6.0.2          YAML parser and emitter for Python
pyzmq                     27.0.2         Python bindings for 0MQ
referencing               0.36.2         JSON Referencing + Python
requests                  2.32.5         Python HTTP for Humans.
rfc3339-validator         0.1.4          A pure python RFC3339 validator
rfc3986-validator         0.1.1          Pure python rfc3986 validator
rfc3987-syntax            1.1.0          Helper functions to syntactically ...
rpds-py                   0.27.1         Python bindings to Rust's persiste...
send2trash                1.8.3          Send file to trash natively under ...
setuptools                80.9.0         Easily download, build, install, u...
six                       1.17.0         Python 2 and 3 compatibility utili...
sniffio                   1.3.1          Sniff out which async library your...
soupsieve                 2.8            A modern CSS selector implementati...
stack-data                0.6.3          Extract data from python stack fra...
terminado                 0.18.1         Tornado websocket backend for the ...
tinycss2                  1.4.0          A tiny CSS parser
tornado                   6.5.2          Tornado is a Python web framework ...
traitlets                 5.14.3         Traitlets Python configuration system
types-python-dateutil     2.9.0.20250822 Typing stubs for python-dateutil
typing-extensions         4.15.0         Backported and Experimental Type H...
uri-template              1.3.0          RFC 6570 URI Template Processor
urllib3                   2.5.0          HTTP library with thread-safe conn...
wcwidth                   0.2.13         Measures the displayed width of un...
webcolors                 24.11.1        A library for working with the col...
webencodings              0.5.1          Character encoding aliases for leg...
websocket-client          1.8.0          WebSocket client for Python with l...
widgetsnbextension        4.0.14         Jupyter interactive widgets for Ju...
```

## STILL EDITING ...
-

-

-


# 🚀 Looking for the code?

If you are looking for the daily code examples, head on over to https://github.com/42DaysOfAI, which is the home od those repos and other goodies.
