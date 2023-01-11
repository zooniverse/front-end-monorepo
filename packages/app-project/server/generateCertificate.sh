#!/usr/bin/env bash
openssl req -nodes -new -x509 -keyout server.key -out server.cert -subj '/CN=local.zooniverse.org/O=Zooniverse'
