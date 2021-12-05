# dotnet-patterns

This is going to be a catalogue of useful "dotnet patterns" for solving common .net (current/next) problems.

The goal is to keep patterns/solutions very small and isolated, but most (or all) patterns should
work togeather if possible. That should be the default. If one pattern or solution interferes or breaks
another, this should be stated.

## Cagegories

A pattern should fit into (at least) one of these categories:

- configuration (startup)
- data access
- error handling
- security (authorization, authentication)
- ui (ux)
- web api (REST)
- web client

Missing a category? I don't want too many of theese.

### configuration

Things that go into Program.cs - solve problems related to setting up builder, adding and configuring 
services and middleware.

### data access

Patterns for data access, repositories, data handling i general and things related to it - caching, 
error handling...

### error handling

Error handling in controllers, views and scripts. Also in web clients and web api.

### security

How to secure a web site with Windows, Azure, custom... How to secure a web api.

### ui

Patterns for solving commin UI/UX problems, like performance with large tables, role-based UI. Not problems
related to a specific javascript-library like Vue or such, but these things can go in here as well.

### web api

Basic solutions for creating a (REST-based) web api...

### web client

Web Api-specific web clients, how to configure them and call a web api


## External Libraries

The patterns should, as far as it's possible, be related to .net, code and libraries that come from Microsoft.

