#!/bin/bash

set -e
set -x

ci_build_id=$1

CYPRESS_API_URL="http://localhost:1234/" VRT_CIBUILDID="${ci_build_id}" cy2 run --parallel --record --key allowed_key1 --ci-build-id "${ci_build_id}" --group test-runs --spec $2
