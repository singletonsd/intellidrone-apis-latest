#!/usr/bin/env bash

# Web Page of BASH best practices https://kvz.io/blog/2013/11/21/bash-best-practices/
#Exit when a command fails.
set -o errexit
#Exit when script tries to use undeclared variables.
set -o nounset
#The exit status of the last command that threw a non-zero exit code is returned.
set -o pipefail

#Trace what gets executed. Useful for debugging.
#set -o xtrace

# Set magic variables for current file & dir
__dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
__file="${__dir}/$(basename "${BASH_SOURCE[0]}")"
__base="$(basename ${__file} .sh)"
__root="$(cd "$(dirname "${__dir}")" && pwd)"

function usage(){
    echo "Usage"
    echo "1 - d (development) or p (production)"
    echo "2 - folder path (optional). Default: PWD"
}

MAIN_FOLDER="${__root}/"
STAGE=
if [ $# -lt 1 ]; then
    echo -e "Illegal number of parameters"
    echo -e "$(usage)"
    exit 1;
else
    if [ "${1}" != "d" ] && [ "${1}" != "p" ]; then
        echo -e "Illegal number of parameters"
        echo -e "$(usage)"
        exit 1;
    fi
    STAGE=${1}
    if [ $# -ge 2 ]; then
        MAIN_FOLDER=${2}
    fi
    if [ "${MAIN_FOLDER-1}" != "/" ];then
        MAIN_FOLDER="${MAIN_FOLDER}/"
    fi
fi

if [ ! -d ${MAIN_FOLDER} ]; then
    mkdir -p ${MAIN_FOLDER}
fi
echo -ne "Checking environment file: "
if [ ! -f "${MAIN_FOLDER}.env" ]; then
    echo -ne "added from environment/"
    if [ "${STAGE}" == "d" ]; then
        cp environment/.dev.env ${MAIN_FOLDER}.env
        echo ".dev.env"
    else
        cp environment/.prod.env ${MAIN_FOLDER}.env
        echo ".prod.env"
    fi
else
    echo "already exits."
fi
echo -ne "Checking keys file: "
if [ ! -f "${MAIN_FOLDER}keys/key.b64.pub" ]; then
    echo "not found. Generating new ones"
    ./scripts/keys_generator.sh ${MAIN_FOLDER}
else
    echo "already exists."
fi

echo -ne "Checking app_tokens file: "
if [ ! -f "${MAIN_FOLDER}app_tokens.json" ]; then
    echo "not found. Creating a empty one."
    echo '[{"name": "prueba","token": "2a8c4e48815aa54eee2940c32d231c2dee003158054bd135e6c7bc89017a64f9","password": "pruebatoken"}]' \
        > ${MAIN_FOLDER}/app_tokens.json
else
    echo "already exists."
fi