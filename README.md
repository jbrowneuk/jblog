Welcome to jBlog!
-----------------
// TODO: finish readme

jBlog is the basic content management system (CMS) powering my portfolio that
I've been constantly developing since early 2004. I've decided to open-source it
now that I have ported it to Angular in the hopes that someone else can learn
from it.

History
-------
jBlog started off as a pure PHP site that I intended to integrate with the
PHP-powered web forum software I was using at the time. However, I never fully
got around to getting the integration working and after a few years I closed
down the forum software as it had been replaced with a variety of social
networks that did a better job.

I've ported it to Angular in the last two months in an effort to learn the
framework. //

Adding posts
------------
The administration panel in its current state is horribly insecure and hasn't
been ported from PHP completely.

The backend is written in PHP, as that is all my web hosting provider allows me
to use on my hosting package - these scripts are what remain of the original
site. They expect to find a SQLite database at the location defined in
`/api/conf/settings.php`
