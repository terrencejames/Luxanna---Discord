## Luxanna

A Simple League of Legends Discord Bot
by Terrence James Diaz

# About

Luxanna is a simple bot built in NodeJS that can respond to various commands 
in your Discord server pertaining to League of Legends info retrieved from the
provided Riot API.

# Usage

A Discord bot can only be invited to a server that a user has the "Manage Server"
permissions with. 

Version 1.0.0

** !status
If Luxanna responds, the bot is correctly configured and online.

** !rank [summoner-name]
Returns the SoloQ rank of the given summoner name.

** !level [summoner-name]
Returns the level of the given summoner name.

# To-Do/Known Bugs

** Error handling: Currently, the bot breaks and must be restarted if a non-existent
username is given with a command. This is because the program tries to access a database
key that doesn't exist and returns an error. 

# Legal

I do not own League of Legends nor am affiliated with Riot, and I do not own nor am affiliated with Discord. 
