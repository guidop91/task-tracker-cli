#!/bin/bash

task-cli-completion() {
    COMPREPLY=()
    local cur="${COMP_WORDS[COMP_CWORD]}"
    local commands="add update delete list mark-in-progress mark-done"

    COMPREPLY=( $(compgen -W "${commands}" -- "$cur") )
    return 0
}

complete -F task-cli-completion task-cli
