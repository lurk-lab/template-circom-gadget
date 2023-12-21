# Template for Circom Gadget

This repository goal is to provide a foundation for any developer that needs to implement a [Circom](https://github.com/iden3/circom)
circuit that could be used in the reduction phase of the [Lurk](https://github.com/lurk-lab/lurk-rs) programing language.

## Overview

Lurk has a **Circom Coprocessor** implemented that allows the compilation of Circom circuit to [Bellpepper](https://github.com/lurk-lab/bellpepper),
effectively enabling their usage in the reduction phase. The Circom coprocessor contains what we call a **Circom Gadget**,
an interface acting as a bridge between the Circom circuit and the Circom coprocessor to compile it to Bellpepper.

This repository facilitates the access to the Circom circuit compiled files that the Gadget and the Coprocessor need.

## Repository structure

```
├── .github
|   └── workflows
|       ├── release_publish.yml # Workflow that will run the tests, compile the circuit and create a release containing them.
|       └── release_setup.yml   # Workflow used to update the Changelog from Unreleased to the next release tag and create the release PR.
├── circuits                    # Folder containing our Circom circuits.
├── test                        # Holds the unit tests to run over our circuits.
└── CHANGELOG.md                # Changelog of the project, containing an history of each release. Should always have an Unreleased section updated at each updates.
```

## Usage

### Derive the template repository

This repository is a template. You should be [able to clone it into your own](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template).

Once you have created your own repository, the first step is to change the different references of the template repository
to yours:
1. Update the `package.json` name and description.
2. In `.github/workflows/release_publish.yml`, update the environment variable so that `GITHUB_REPOSITORY` refers to your repository
with the format `<AUTHOR>/<NAME>` and  `CIRCUIT_NAME` refers to the `<NAME>` of the repository.  

> ❗ The name of the repository and the name of your target circuit file need to be the same (e.g.: `lurk-lab/template-circom-gadget`
> -> `template-circom-gadget.circom`).

### Develop new features

You can develop new features are you are used to, no changes in that regard. However, it is also needed to update the `CHANGELOG.md`
*Uneleased* section when developing new features or making hotfix. This is needed because the workflow we provide will
directly use the content of that section to write the description of the next release.

### Create a release

In order for you to create releases of your Circom Gadget that can be used in Lurk we created to workflow to automate the
task:
1. `release_setup.yml`: This workflow takes the next release tag as an input. It should be run directly from the _Actions_
tab of your repository. It will update the _Unreleased_ section of the `CHANGELOG.md` to the specified tag and create a
release pull request.
2. `release_publish.yml`: Triggered once the release PR is closed. It will run the unit tests in the repository, compile
the target circuit to generate the r1cs & wasm files, and finally create the release at the specified tag along with the
generated files.

## Constraint

The biggest constraint that exists right now is that the name of the static files attached to the release must be the same 
ones as the repository. This implies one huge problem: there only be one circuit that can be turned in a Circom Gadget per
repository. 
