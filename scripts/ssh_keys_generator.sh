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

if ! type "ssh-keygen" &> /dev/null; then
  echo "ssh-keygen is not installed. Install it and then re launch"
  exit 1
fi

if ! type "ssh-copy-id" &> /dev/null; then
  echo "ssh-copy-id is not installed. Install it and then re launch"
  exit 1
fi

function usage(){
    echo "Usage"
    echo "1 - user@domain"
    echo "2 - port (optional)"
}

USER_HOST=
PORT=
if [ $# -lt 1 ]; then
    echo -e "Illegal number of parameters"
    echo -e "$(usage)"
    exit 1;
else
    USER_HOST=${1}
    if [ $# -ge 2 ]; then
        PORT=${2}
    else
        PORT=22
    fi
fi
DATE=$(date "+%y%m%d%H%M%S")
KEYS_FOLDER="${__root}/keys/ssh/${DATE}"
PUBLIC_FILE=${KEYS_FOLDER}/key
if [ ! -d ${KEYS_FOLDER} ]; then
    mkdir -p ${KEYS_FOLDER}
fi

if [ -f ${PUBLIC_FILE} ]; then
    rm ${PUBLIC_FILE}
fi
if [ -f "${PUBLIC_FILE}.pub" ]; then
    rm "${PUBLIC_FILE}.pub"
fi
ssh-keygen -b 4096 -t ed25519 -f ${PUBLIC_FILE} -q -N ""

echo ${PUBLIC_FILE} | base64 > "${PUBLIC_FILE}.b64"
echo "${PUBLIC_FILE}.pub" | base64 > "${PUBLIC_FILE}.b64.pub"

ssh-copy-id  -i ${PUBLIC_FILE} ${USER_HOST} -p ${PORT}
echo "Files saved at ${KEYS_FOLDER}"