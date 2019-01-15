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

if ! type "docker" &> /dev/null; then
  echo -ne "docker is not installed. Install it and then re launch"
  exit 1
fi

if ! type "docker-compose" &> /dev/null; then
  echo -ne "docker-compose is not installed. Install it and then re launch"
  exit 1
fi

function usage(){
    echo "Usage"
    echo "1 - d (development) p (production)"
}

STAGE=
if [ $# -lt 1 ]; then
    echo -e "Illegal number of parameters"
    echo -e "$(usage)"
    exit 1;
else
    if [ "${1}" != "d" ] && [ "${1}" == "p" ]; then
        echo -e "Illegal number of parameters"
        echo -e "$(usage)"
        exit 1;
    fi
    STAGE=${1}
fi

DATA_DIR_MAIN=data
DATA_DIR_DB="${DATA_DIR_MAIN}/db"
DATA_DIR_NODE="${DATA_DIR_MAIN}/node"
if [ ! -d ${DATA_DIR_DB} ]; then
    mkdir -p ${DATA_DIR_DB}
fi

./scripts/init_service.sh ${STAGE}

if [ "${STAGE}" == "p" ]; then
    if [ ! -d ${DATA_DIR_NODE} ]; then
        mkdir -p ${DATA_DIR_NODE}
    fi
    docker-compose -f docker-compose.yml up
else
    docker-compose up
fi

