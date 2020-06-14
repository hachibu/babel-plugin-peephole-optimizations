# Babel Plugin Peephole Optimizations

[![Build Status](https://travis-ci.com/hachibu/babel-plugin-peephole-optimizations.svg?branch=master)](https://travis-ci.com/hachibu/babel-plugin-peephole-optimizations)

## Features

  - [x] Constant Folding
    - [x] String addition
    - [x] Number addition

  - [x] Constant Propagation
    - [x] Replace identifiers with literals

  - [x] Strength Reduction
    - [x] Multiplication into addition
    - [x] Exponentiation into multiplication
    - [x] Power of 2 multiplication and division into shifts

## Notes

  - https://en.wikipedia.org/wiki/Optimizing_compiler#List_of_compiler_optimizations
