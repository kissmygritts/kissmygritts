---
title: How I Update R
date: 2019-05-31
published: true
category: R
tags: ['cs weekly', 'r']
canonical_url: false
description: 'Steps to update to the newest versions of R and RStudio'
---

TLDR; Install and/or Update R and R Studio on your computer

## CS Weekly?

Over the last several months I've posted random snippets of code on my [Instagram page](https://instagram.com/_gritts_)([like this one for R](https://www.instagram.com/p/BuW8ernBb9C/), [or this one for JavaScript](https://www.instagram.com/p/Bh7u4SjF19G/), [or this one about first class functions](https://www.instagram.com/p/BhzimtCFG-8/)). I'm not sharing the actual snippets of code I'm working on, rather simplified versions that make the code easier to explain. It is a fun distraction from work to think about the best ways to describe some interesting concepts. I don't have many follows that are coders, but I do have a few. 

Sometimes it is impossible to summarize everything that needs to be explained in an Instagram post. So I've decided to include them here as well. Hopefully with more thorough explanations.

## Update R

The overall release schedule for R is to release updates every year in the spring, with patches issued as needed. You can plan on updating R at least once a year. However, updating R isn't always easy. These are the steps I follow in to update R on my machine. It might not be the best, but it works for me. 

The following line of code will create a list of all the packages you've installed in R. This is a jumbled bit of code, you can dissect it if you want. 

I generally run this in my documents folder of my computer, that way I know where the saved file goes. You can change where this file is saved by changing the `file` parameter in the `save` function.

```r
pkgs <- installed.packages()[, 1][!(installed.packages()[, 1] %in%
          installed.packages(priority = 'base')[, 1])]
save(pkgs, file = 'installed_packages.RData')
```

After running the above snippet of code I'll exit R Studio and install the [newest version of R](https://cran.r-project.org/). Once R is installed run the following line of code to install all of your packages.

```r
load('installed_packages.RData')
install.packages(pkgs)
```

*Note: the current version of these packages will be installed, this may have unintended consequences. If you experience issues you can specify the version you wish to install, and retry the installation of the package causing issues.*

## R & R Studio Setup

General R and R Studio setup tips if you are attempting to install R for the first time.

### Install R

The current (3.6.0 as of May 6, 2019) installation file for R can be found here: [https://cran.r-project.org/](https://cran.r-project.org/). Select the installation for your system. 

### Install R Studio

The current (1.2.1335 as of May 6, 2019) installation file for R Studio can be found here: [https://www.rstudio.com/products/rstudio/download/#download](https://www.rstudio.com/products/rstudio/download/#download). Select the installation for your system.

### Customizing Your IDE

There are many options for to customize your environment. Go to the `Tools > Global Options` menu option. Here you can change the appearance and behavior of R Studio.

#### Useful Settings

Every time I open R I want a fresh environment to work in. On the General tab of the Global Options menu uncheck the `Restore most recently opened project at startup` and `Restore previously open source documents at startup` under the **R Sessions** section. Uncheck the `Restore .RData into workspace at startup` and choose the Never from the drop down for `Save workspace to .RData on exit`.

I prefer a dark IDE, select the Appearance menu item, and in the `Editor theme` box choose a dark theme (or different theme). You'll see a preview to the right.

### Helpful Packages

If you have a fresh install the following packages are good to install.

- `tidyverse` - installs many packages that make working in R a lot more expressive
- `sf` - for spatial data analysis, newer packaged for spatial data
- `raster` - for raster data
- `viridis` - color palettes for plotting continuous data
- `rcartocolors` - color palettes for mapping, diverging, categorical data
- `sp` - the original spatial packages, quickly becoming obsolete because of the `sf` package. You'll still need some of the functions from `sp.`

Install these with the following command

```r
install.packages(c('tidyverse', 'sf', 'raster',
                   'viridis', 'rcartocolors', 'sp'))
```