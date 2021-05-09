# Caesar cipher CLI tool

**A command line tool that encodes and decodes text with [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher)**.

For encoding/decoding used only the English alphabet, all other characters remain unchanged.

## Install
0. You should have installed [Node.js](https://nodejs.org/) on your computer.
1. Download files from this repository.
2. Go to folder `caesar_cli`.
3. Open your computer’s command prompt (Windows) or terminal (macOS/Linux) in the specified directory.
4. To install dependencies use `npm install` or `npm i`.

## Usage
From the `caesar_cli` directory use next commands:

`node . [options]`

or

`node index [options]`

From the parent of `caesar_cli` directory use comand:

`node caesar_cli [options]`

## Options
- `--shift` (`-s`): **required**. Can be positive or negative integer. Sets еру alphabetical shift Caesar cipher.
- `--action` (`-a`): **required**. Can be only **encode** or **decode**.
- `--input` (`-i`): **optional**. Path to file with text for encoding/decoding. If not specified the text will need to be entered into command line.
- `--output` (`-o`): **optional**. Path to file for result of encoding/decoding. If not specified the text will be printed into command line.

If some of the specified files are not found or have limited access the application will fail with an error.

## Usage examples
```bash
$ node caesar_cli -a encode -s 7 -i "./input.txt" -o "./output.txt"
```
> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`

```bash
$ node caesar_cli --action decode --shift 7 --input encoded.txt --output plain.txt
```
> encoded.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`

> plain.txt
> `This is secret. Message about "_" symbol!`
