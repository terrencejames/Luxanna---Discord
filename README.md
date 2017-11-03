# Luxanna

*"Lighting the way"*

A Simple League of Legends Discord Bot

by Terrence James Diaz

## About

Luxanna is a simple bot built in NodeJS that can respond to various commands 
in your Discord server pertaining to League of Legends info retrieved from the
provided Riot API and *other entertaining things*.

## Usage

A Discord bot can only be invited to a server that a user has the "Manage Server"
permissions with. 

Version 1.1.0

#### Elementalist Luxanna
Luxanna is currently based off of Elementalist Lux, so she can transform freely into
10 different elements that could change the responses to the commands below. 

Currently supported elements:
- Light (default)
- Dark
- Fire
- Water
- Ice
- Nature
- Mystic
- Magma
- Air
- Storm

#### Commands 

- *!status*

If Luxanna responds, the bot is correctly configured and online.

- *!rank [summoner-name]*

Returns the SoloQ rank of the given summoner name.

- *!level [summoner-name]*

Returns the level of the given summoner name.

- *!google [query]*

Returns a Google link using the "I'm Feeling Lucky" function on the given query.

- *!transform [element]*

Change Luxanna into the given element. The default element is Light. Will also
shout the Lux quote of the new element in the voice channel. 

- *!ult*

Joins the voice channel and shouts the Lux ultimate line of the current element and 
quotes the text in the text channel as well.

- *!laugh*

Joins the voice channel and laughs according to the current element.



## To-Do/Known Bugs

- [ ] Error handling: Currently, the bot breaks and must be restarted if a non-existent
username is given with a command. This is because the program tries to access a database
key that doesn't exist and returns an error. 
- [ ] Differentiate between ranks of different queue types.
- [ ] Add a command that tries to analyze whether a given player might be on "tilt"
- [ ] Add a command that highlights a given player's best played match in their most recent games.
- [x] Elemental transformation support (!)
- [x] Pipe Lux quotes into audio stream
- [ ] Refactor some of the command logic into different files
- [ ] Organize audio files into external folders
- [ ] More stuff in the future

## Legal

I do not own League of Legends nor am affiliated with Riot, and I do not own nor am affiliated with Discord. 
