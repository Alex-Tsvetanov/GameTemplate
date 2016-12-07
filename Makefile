TSC = /usr/bin/tsc
NODE = /usr/bin/node
NODEARGS = --no-lazy
MAIN = ./main.ts
OUTPUT = ./main.js


all: build run
build: $(MAIN)
	$(TSC) $(MAIN) --outFile $(OUTPUT)
run:
	$(NODE) $(NODEARGS) $(OUTPUT)