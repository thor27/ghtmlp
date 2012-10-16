ghtmlp
======

filter HTML files content on your system using javascript and jQuery

Example usage with pipe:

```
$ echo 'hello <b>world</b>' | ./ghtmlp.js --filter b
world
```

```
$ echo 'hello <p id="example" class="Special">world</p>' | ./ghtmlp.js --eval '$("#example").attr("class")'
Special
```

Example usage with multiple files:

```
$ ls *html
1.html  2.html  3.html
$ cat 1.html 
<div class='teste'>Second</div>
$ cat 2.html 
<div class='teste'>First</div>
$ cat 3.html 
<div class='teste'>third</div>
$ ./ghtmlp.js --filter '.teste' *html
1.html: Second
2.html: First
3.html: third
```

Installation
=============

You need to have node installed on your system.
You need to install this dependencies:

```
npm install jsdom
npm install optimist
```

