"use strict"
const path = require("path")
const Generator = require("yeoman-generator")

module.exports = class extends Generator {
    prompting() {
        this.username = ""
        return this.prompt({
            type: "input",
            name: "username",
            message: "GitHub username ?",
            store: true
        }).then(answers => {
            this.username = answers.username
        })
    }

    writing() {
        let packageName = path.basename(process.cwd())
        let author = this.username

        const variables = {
            packageName,
            author,
            repoUrl: `https://github.com/${author}/${packageName}`
        }

        ["README.md", "package.json"].map(fn =>
            this.fs.copyTpl(this.templatePath(fn), this.destinationPath(fn), variables)
        )
    }

    install() {
        this.npmInstall()
    }
}