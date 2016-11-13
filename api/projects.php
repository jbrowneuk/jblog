<?php

@header("Content-Type:application/json; charset=utf-8");
print <<<EOF
{
  "data": [
    {
      "title": "Artefact, a 2D ‘platformer’ game",
      "summary": "Artefact is a take on the 2D platformer genre, in the same vein as Mario, Sonic and Lode runner.",
      "info": "C# and the MonoGame framework",
      "link": "http://jbrowne.me.uk/code/artefact/",
      "image": "http://jbrowne.me.uk/code/artefact/folder.jpg"
    },
    {
      "title": "car.pool",
      "summary": "The car.pool application is a proof-of-concept front-end application for a hypothetical customer, built as part of a challenge.",
      "info": "HTML 5 and CSS 3 responsive front-end",
      "link": "http://jbrowne.me.uk/lab/carpool.app/desktop.htm",
      "image": "http://jbrowne.me.uk/code/carpool/folder.jpg"
    },
    {
      "title": "Skye, the IRC chatbot",
      "summary": "Skye is an IRC chatbot which I begun working on at university as part of my third year Natural Language Processing coursework. It started off as a simple automated tally for games played on the AppliedIRC network and has had features tacked onto it over the years.",
      "info": "C#: Console application",
      "link": "http://jbrowne.me.uk/code/skye/",
      "image": "http://jbrowne.me.uk/code/skye/folder.jpg"
    },
    {
      "title": "Tasks",
      "summary": "A tiny little to do list application whose sole aim is to be clean and unobtrusive.",
      "info": "C# and the WPF framework",
      "link": "//github.com/jbrowneuk/tsuki-tasks",
      "image": "http://jbrowne.me.uk/code/tasks/folder.jpg"
    }
  ]
}
EOF;
