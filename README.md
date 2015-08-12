# The Talos Compendium
The UI and web app components of The Talos Compendium, a text database for [The Talos Principle](http://www.croteam.com/talosprinciple/)

For the data generation component of the project, see [ygunayer/talos-decoder](https://github.com/ygunayer/talos-decoder)

## About
[The Talos Principle](http://www.croteam.com/talosprinciple/), a philosophical first-person puzzle game made by Croteam, the developers of the Serious Sam series, features a set of library computer terminals scattered around its ruined, virtual world. These computer terminals contain texts from various kinds of communication medium, all retrieved from the outside (or "real") world.

Story-wise, these texts are partially corrupted and are displayed incorrectly. In reality, those "corrupted" parts are in fact hexadecimal representations of some actual philosophical quotes from the real world, our world. When decoded, these text segments provide some kind of philosophical back story, and therefore increase the immersion factor.

While it's perfectly possible to use some kind of hex-to-string tool to "decode" these texts, it's a cumbersome effort to do while playing the game. To address that, people have put up the decoded versions of these texts over the internet, but since they're plain-text, they're difficult to navigate through.

This site is intends to address this issue by introducing an alternative, and hopefully better experience: search by filename. Each in-game text have a custom file name displayed on the screen, so players can simply simply launch Steam's web browser (or minimize the game and open up their own browsers), type the file name in the search box, and view both the original and the decoded version of a given text.

There are three display modes: original, decoded and both. In the "original" display mode, the text is displayed as they appear in the game. The decoded parts (if any) are higlighted, and they reveal their decoded versions when hovered on. The "decoded" display mode does the same thing in reverse, and as the name suggests, the "both" display mode shows both versions of the text side-by-side.

## Running
The following are needed to run the project:
- Node (tested w/ 0.12.7)
- NPM (tested w/ 2.11.3)
- An ElasticSearch installation

Before running the project, check the ElasticSearch configuration at ```build/config.js```, and make sure that all NPM packages are installed by running ```npm install```

When ready, simply navigate to the root folder of the project (where ```package.json``` is located) and then run the following command:

```npm start```

## Contributing
To send feedback, request a feature or to report an error, please open an issue. use the issues section. To contribute code-wise, feel free to fork the project and send a pull request.

## What's Missing
- Not enough tests (none at all in the UI component)
- Even though the code itself does not contain anything from the game itself, I'm not sure about which license to use, so there's no license yet
- Both original and decoded texts as well as the file names and the key they're stored in the game assets as are all indexed in ElasticSearch, but the search only operates on the filename field as a ```prefix``` search
- The encoded text segments are captured blindly, so some texts might have been decoded unnecessarily, incorrectly, or might not even have been decoded at all. To address this issue, the extraction process might be improved, or some manual or pre-defined post processes might be constructed to patch the data in ElasticSearch

