# Cask n Grill Restaurant

## TODO
* Create component for centered image logos
* Create component for Page titles
* Create generic text paragraph component

## Overall Development

This kind of spiraled from the original task of creating a site using only Javascript to a full exploration of component-based design.  Along the way the following concepts were explored:

* ES6 classes and inheritance
* Localized CSS with Webpack
* CSS Imports with Webpack
* Google Fonts API for being pretty
* ImageMagick transformation of images

This is getting pretty close to React style development, which using a framework would make much more sense.  The basic concepts learned here can carry over to framework-driven development as well:

* Separate layout and typography from components
* Localize area of effect where possible with components
* Webpack is an amazing tool with no real one way to do things


## Image Manipulation

Thanks to Smashing Magazine for the great article on image manipulation.

https://www.smashingmagazine.com/2015/06/efficient-image-resizing-with-imagemagick/

### ImageMagick command line for Slideshow images

```
mogrify -filter Triangle -define filter:support=2 -unsharp 0.25x0.25+8+0.065 -dither None -posterize 136 -quality 82 -define jpeg:fancy-upsampling=off -define png:compression-filter=5 -define png:compression-level=9 -define png:compression-strategy=1 -define png:exclude-chunk=all -interlace none -colorspace sRGB -strip -gravity center -resize WIDTH_HEIGHT^ -extent WIDTH_HEIGHT -path OUTPUT_PATH ./*.jpg
```

## Further Study

* Explore ways to ensure the site renders correctly using Babel
* Lazy loading of images that are large (slideshow is a bit big)
* Explore using JSX outside of React, manually creating HTML is messy and error prone
