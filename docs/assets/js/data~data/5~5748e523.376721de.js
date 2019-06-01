(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{259:function(n){n.exports={data:{tag:{title:"movement ecology",belongsTo:{edges:[{node:{title:"Minimum Convex Polygons",path:"/minimum-convex-polygons",date:"2. April 2018",timeToRead:8,description:"Calculating minimum convex polygons",content:'<p>I think that it is important to start at first principles in this series. Where better than Minimum Convex Polygons (MCP)! Perhaps one of the first analytical methods for delineating a species home range, the has fallen out of favor over the last several years. The main strength of an MCP is its simplicity. An MCP can be built using observations, trap locations, fecal or hair snare locations, radio telemetry, or GPS telemetry locations. MCPs are easy to reason about as well (more on that below). However, they tend to over estimate the area of use, or core species areas. </p>\n<h2 id="the-convex-hull"><a href="#the-convex-hull" aria-hidden="true"><span class="icon icon-link"></span></a>The Convex Hull</h2>\n<p>The idea of a Minimum Convex Polygon is borrowed directly from mathemateics (<a href="https://en.wikipedia.org/wiki/Convex_hull" target="_blank" rel="nofollow noopener noreferrer">convex hull</a>). I will often use the term convex hull and convex polygon to interchangeably. They both mean the same thing: a set of points that is the smallest convex set that contains all the points. That sounds confusing. To help visualize a convex hull, imagine a board with a set of nails on it. Now stretch a rubber band around all the outermost nails. The shape made by the rubber band is the convex hull. The rubber band might not touch all of the nails. </p>\n<p>I distinguish convex and concave by remembering that convex is curved outward, while concave curves inwards (like a cave). In order to ensure that a convex hull is indeed convex, draw line segments that join each pair of points. If any of those lines cross over the boundary of the convex hull (or rubber band in the example above), then it isn\'t a convex hull. </p>\n<p>On a 2D plane the convex hull is a polygon. In 3 dimensions it is a 3 dimensional shape (cuboid, spherical) that has a volumn. A convex hull can be generalized into higher dimensions. A convex hull is not limited to points, and can be created for any type of geometric object. For instance, a set of lines can have a MCP that contains the entire set of lines. Same for a set of polygons.</p>\n<p>Computing a minimum convex hull is a fundemental problem in computation geometry. I\'m sure that you can think up a bit of pseudocode to compute the convex hull of a set of points. Just like the rubber band example above, identify the outermost points and draw a line connecting them. But, that is the hard part, and one of my favorite things to think about. It is easy for our eyes to identify the minimum convex hull, however, trying to get a computer to do it can be a bit of a challenge. </p>\n<p>Fortunately, there are <a href="https://en.wikipedia.org/wiki/Convex_hull_algorithms" target="_blank" rel="nofollow noopener noreferrer">many algorithms</a> to compute the convex hull for a set of points or geometric objects. In R, there is a function (within the <code class="language-text">grDevices</code> namespace, loaded at startup) <code class="language-text">chull</code> that computes a convex hull. This is an implementation of the <a href="https://en.wikipedia.org/wiki/Quickhull" target="_blank" rel="nofollow noopener noreferrer">Quickhull</a> algorithm. The documentation for <code class="language-text">chull</code> references these two papers (<a href="https://dl.acm.org/citation.cfm?doid=355759.355766" target="_blank" rel="nofollow noopener noreferrer">1</a>, <a href="https://dl.acm.org/citation.cfm?doid=355759.355768" target="_blank" rel="nofollow noopener noreferrer">2</a>). Honestly, the literature for this topic is fascinating, I highly recommend reading some of these papers. The <a href="https://en.wikipedia.org/wiki/Quickhull" target="_blank" rel="nofollow noopener noreferrer">wikipedia</a> page for the algorithm gives a very good pseudo-code definition of the steps of the algorithm: </p>\n<ol>\n<li>Find the minimum and maximum x coordinates, these will always be part of the convex hull.</li>\n<li>Use the line formed by the two points to divide the set in two subsets of points, which will be processed recursively.</li>\n<li>Determine the point, on one side of the line, with the maximum distance from the line. The two points from step 1, and this point form a triangle.</li>\n<li>The points lying inside of that triangle cannot be part of the convex hull, and can be ignored.</li>\n<li>Repeat the previous two steps on the two lines formed by the triangle (not the initial line).</li>\n<li>Keep on doing so until no more points are left, the points selected constitute the convex hull.</li>\n</ol>\n<p>The <code class="language-text">chull</code> function in R only works for 2 dimension. In the <code class="language-text">geometry</code> package the function <code class="language-text">convhulln</code> is generalized to <em>n</em>-dimensional space. Regardless of which hull computation function we use, both interface with an implementation written in C. As such, they are both very fast. If you need to work in <em>n</em>-dimensional space you\'ll need to resort to <code class="language-text">geometry::convhulln</code>. The <a href="https://github.com/cran/adehabitatHR/blob/master/R/mcp.r" target="_blank" rel="nofollow noopener noreferrer"><code class="language-text">adehabitatHR</code> package</a> (a popular package for generating home ranges) uses <code class="language-text">chull</code> for computing MCPs.</p>\n<h3 id="computing-an-convex-hull"><a href="#computing-an-convex-hull" aria-hidden="true"><span class="icon icon-link"></span></a>Computing an Convex Hull</h3>\n<p>Let\'s generate a set of random points to work with. Then use the <code class="language-text">chull</code> function to generate the convex hull of that point set.</p>\n<pre class="language-r"><span class="token comment"># create a matrix of random points</span>\npointset <span class="token operator">&lt;-</span> cbind<span class="token punctuation">(</span>\n  rnorm<span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> mean <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> sd <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  rnorm<span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> mean <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> sd <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">)</span>\n<span class="token punctuation">)</span>\n\n<span class="token comment"># get index of convex hull points. </span>\n<span class="token comment"># the chull function returns the index of the points that</span>\n<span class="token comment"># define the convex hull, not the actual points</span>\nhull_idx <span class="token operator">&lt;-</span> chull<span class="token punctuation">(</span>pointset<span class="token punctuation">)</span>\n\n<span class="token comment"># get the actual points of the convex hull</span>\nhull_pts <span class="token operator">&lt;-</span> pointset<span class="token punctuation">[</span>hull_idx<span class="token punctuation">,</span> <span class="token punctuation">]</span>\n\n<span class="token comment"># plot the results</span>\nplot<span class="token punctuation">(</span>pointset<span class="token punctuation">)</span>\npoints<span class="token punctuation">(</span>hull_pts<span class="token punctuation">,</span> col <span class="token operator">=</span> <span class="token string">\'red\'</span><span class="token punctuation">,</span> pch <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">)</span>\n\n<span class="token comment"># note, that the hull_pts aren\'t a closed polygon</span>\nplot<span class="token punctuation">(</span>hull_pts<span class="token punctuation">)</span>\nlines<span class="token punctuation">(</span>hull_pts<span class="token punctuation">)</span>\n\n<span class="token comment"># to create a closed polygon, the first point must also be the last point</span>\nhull <span class="token operator">&lt;-</span> pointset<span class="token punctuation">[</span>c<span class="token punctuation">(</span>hull_idx<span class="token punctuation">,</span> hull_idx<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">]</span></pre>\n<p>There we have it, the vertices of the convex hull this pointset. </p>\n<p><img class="g-image g-image--lazy g-image--loading" src="data:image/svg+xml,%3csvg fill=\'none\' viewBox=\'0 0 800 500\' xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\'%3e%3cdefs%3e%3cfilter id=\'__svg-blur-0\'%3e%3cfeGaussianBlur in=\'SourceGraphic\' stdDeviation=\'40\'/%3e%3c/filter%3e%3c/defs%3e%3cimage x=\'0\' y=\'0\' filter=\'url(%23__svg-blur-0)\' width=\'800\' height=\'500\' xlink:href=\'data:image/jpeg%3bbase64%2c/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAoAEADASIAAhEBAxEB/8QAGQAAAwEBAQAAAAAAAAAAAAAAAAEDAgQI/8QALRABAAEDAwIFAwMFAAAAAAAAAQIAAxESITEEEyJBUXGRU2GSFEJSgaGxwfD/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABYRAQEBAAAAAAAAAAAAAAAAAAARAf/aAAwDAQACEQMRAD8A9UTkRMufTBU5dRCMiMiRJMhile1a4YkEVDGN8770%2bnXCJLIHjf3bc0Ud%2bPpL4oeogGUkHtVHCg4zyVlJahUlHjTj%2b9EZ78fSXxQ34hlJY9q2W4CoYUxtRE0mnHhNhXOaCcOqtzmxhlkGUOapGZKWMSHGdyldisFghMPC4zigc3IPrF/1RXF0duVvpumLltLhgVDPLtXbaAjnz4%2bKnfTu2zXvqPDt996VvuGsuW1CXhwiYzz/AN6UF1BNt3bilKcYiykAOH3pN23qIsgkjgdmiMoBiPH2KE1sAADAVllF2km%2b2H4pamWTTIM7J51m5KezCC7hhx680I3HEoGYntzUrU4yuYi5DJnyeH%2bvNUIbYljH8TYpESNyEYgRIoB5cUDu2y5HDjy8h86XYtfSh%2bJRRRCh09uMQYQfvpKxdtW7ZK52SewaYwFoooJ2i3flj9LO1pc5nbjv/mujsWvpw/EoooFDp7UYAwgoc6TenbsxtzlKIGrGxEMUUUH/2Q==\' /%3e%3c/svg%3e" width="800" alt="convex hull" data-srcset="/assets/static/convex_hull.82a2fbd.5a01230.jpeg 480w, /assets/static/convex_hull.775f9c8.5a01230.jpeg 800w" data-sizes="(max-width: 800px) 100vw, 800px" data-src="/assets/static/convex_hull.775f9c8.5a01230.jpeg"><noscript><img class="g-image g-image--lazy g-image--loaded" src="/assets/static/convex_hull.775f9c8.5a01230.jpeg" width="800" alt="convex hull"></noscript></p>\n<h2 id="minimum-convex-polygons"><a href="#minimum-convex-polygons" aria-hidden="true"><span class="icon icon-link"></span></a>Minimum Convex Polygons</h2>\n<p>In ecology most MCP methods allow for computing a <em>n</em> percentile MCP in order to reduce the influence of outliers. I often see the 90%, 95%, or 99% MCP estimated. This doesn\'t change how the convex hull is estimated. What does change is the points that are used for the convex hull estimation.</p>\n<p>When computing a <em>n</em> percentile MCP we are asking for the <em>n</em>% of points closest to the centroid of the pointset. So these are the steps in computing an <em>n</em> percentile MCP:</p>\n<ol>\n<li>Compute the centroid of the pointset.</li>\n<li>Calculate the distance between every point and the centroid.</li>\n<li>Exclude points greater than <em>n</em> percentile away from the centroid.</li>\n<li>Compute the convex hull for the remaining points.</li>\n</ol>\n<p>The code below walks through the computation for generating an <em>n</em>% MCP.</p>\n<pre class="language-r"><span class="token comment"># use the same data as above</span>\ncentroid <span class="token operator">&lt;-</span> apply<span class="token punctuation">(</span>pointset<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> mean<span class="token punctuation">)</span>\n\n<span class="token comment"># compute the distance from the centroid</span>\nd <span class="token operator">&lt;-</span> sqrt<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span>pointset<span class="token punctuation">[</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">-</span> centroid<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">^</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>pointset<span class="token punctuation">[</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">-</span> centroid<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">^</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span> \n\n<span class="token comment"># get the points where the distance to the </span>\n<span class="token comment"># centroid &lt;= the selected percentile</span>\n<span class="token comment"># since our original pointset is 100 points, and we selected</span>\n<span class="token comment"># the 95 percentile, there should be 95 points in new_pointset</span>\nnew_pointset <span class="token operator">&lt;-</span> pointset<span class="token punctuation">[</span>seq_along<span class="token punctuation">(</span>d<span class="token punctuation">)</span><span class="token punctuation">[</span>d <span class="token operator">&lt;=</span> quantile<span class="token punctuation">(</span>d<span class="token punctuation">,</span> <span class="token number">.95</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">]</span>\n\n<span class="token comment"># compute the convex hull of this new_pointset</span>\nhull95 <span class="token operator">&lt;-</span> chull<span class="token punctuation">(</span>new_pointset<span class="token punctuation">)</span>\n\n<span class="token comment"># remember, chull returns the index of each point</span>\n<span class="token comment"># and the first point and last point must be the same</span>\nhull95 <span class="token operator">&lt;-</span> new_pointset<span class="token punctuation">[</span>c<span class="token punctuation">(</span>hull95<span class="token punctuation">,</span> hull95<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">]</span>\n\n<span class="token comment"># and we can plot the MCP</span>\nplot<span class="token punctuation">(</span>pointset<span class="token punctuation">,</span> asp <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">)</span>\nlines<span class="token punctuation">(</span>hull95<span class="token punctuation">,</span> col <span class="token operator">=</span> <span class="token string">\'red\'</span><span class="token punctuation">)</span>\npoints<span class="token punctuation">(</span>centroid<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> centroid<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span> col <span class="token operator">=</span> <span class="token string">\'blue\'</span><span class="token punctuation">,</span> pch <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">)</span></pre>\n<p><img class="g-image g-image--lazy g-image--loading" src="data:image/svg+xml,%3csvg fill=\'none\' viewBox=\'0 0 1000 800\' xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\'%3e%3cdefs%3e%3cfilter id=\'__svg-blur-1\'%3e%3cfeGaussianBlur in=\'SourceGraphic\' stdDeviation=\'40\'/%3e%3c/filter%3e%3c/defs%3e%3cimage x=\'0\' y=\'0\' filter=\'url(%23__svg-blur-1)\' width=\'1000\' height=\'800\' xlink:href=\'data:image/jpeg%3bbase64%2c/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAzAEADASIAAhEBAxEB/8QAGQAAAwEBAQAAAAAAAAAAAAAAAAIDAQQI/8QALBAAAgIBAgMIAgIDAAAAAAAAAQIAEQMSITEyQSJRUmFxkcHRBBNiobHh8P/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFhEBAQEAAAAAAAAAAAAAAAAAAAER/9oADAMBAAIRAxEAPwD1OzEEACyYW/gHvEKgfkKw4kG95WAtv4B7xWyFb1KABxtpQkAWTQkx2j2635VgBykV2R7xrfwD3mE6tgwo7WO%2bZwIreukKa38A94Bm1AMtX5zVYNwPDYzG509fiESRseTJjyYyp1Amx1l5zYETC2LCrWUUjznSTXS4CNu9Ny1YHnFZQSrE0aPTh5%2bUbKuoAgkUb26%2bUGXWd90IrjUKirlnyIK/aorVpvTfC%2b%2bXU0KZgW6yQVu3pFN31xP/AG0ZVCIAbc3W8IYE/tIrYi7mtzp6/EMfC%2b%2bDc6evxC0hYH8hVF2Ab2lZPMSmlgL3qt%2bvpMfJkWrQbmtiT8QisnoYPYIruNzGyZFZQUHaNCifqBfIGUaBZ/kfqAyoVFAj2gUJBGtt4urLrrQvC%2bb/AFDXk16dC3V8x%2boNVFcP6itzp6/EQZMhdl0CxXU/UFZnyUVA0Hfc93pArCEIBMdA6FWvSRRo1CEBMODHhBGMEXxsk/5lIQgEIQgf/9k=\' /%3e%3c/svg%3e" width="1000" alt="95% convex hull" data-srcset="/assets/static/convex_hull_95.82a2fbd.c6e6427.jpeg 480w, /assets/static/convex_hull_95.97c148e.c6e6427.jpeg 1000w" data-sizes="(max-width: 1000px) 100vw, 1000px" data-src="/assets/static/convex_hull_95.97c148e.c6e6427.jpeg"><noscript><img class="g-image g-image--lazy g-image--loaded" src="/assets/static/convex_hull_95.97c148e.c6e6427.jpeg" width="1000" alt="95% convex hull"></noscript></p>\n<p>The MCP above should have 5 points not within the border (since we calculated a 95% MCP of 100 points).</p>\n<p>Of course, all this can be wrapped up into a function. Try the function below on the original pointset. You should get the same MCP as the image above.</p>\n<pre class="language-r">get_mcp <span class="token operator">&lt;-</span> <span class="token keyword">function</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> pct<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token comment"># x is a matrix of coordinates,</span>\n  <span class="token comment"># pct is the percentile MCP to calculate</span>\n  centroid <span class="token operator">&lt;-</span> apply<span class="token punctuation">(</span>x<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> mean<span class="token punctuation">)</span>\n  d <span class="token operator">&lt;-</span> sqrt<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span>x<span class="token punctuation">[</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">-</span> centroid<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">^</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>x<span class="token punctuation">[</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">-</span> centroid<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">^</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n\n  <span class="token comment"># create pct pointset</span>\n  pointset <span class="token operator">&lt;-</span> x<span class="token punctuation">[</span>seq_along<span class="token punctuation">(</span>d<span class="token punctuation">)</span><span class="token punctuation">[</span>d <span class="token operator">&lt;=</span> quantile<span class="token punctuation">(</span>d<span class="token punctuation">,</span> pct<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">]</span>\n  \n  <span class="token comment"># get vertices of the convex hull</span>\n  vertices <span class="token operator">&lt;-</span> chull<span class="token punctuation">(</span>pointset<span class="token punctuation">)</span>\n\n  <span class="token comment"># return a matrix of xy-coordinate pairs that define the mcp</span>\n  return<span class="token punctuation">(</span>pointset<span class="token punctuation">[</span>c<span class="token punctuation">(</span>vertices<span class="token punctuation">,</span> vertices<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">]</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span></pre>\n<h2 id="mcp-properties"><a href="#mcp-properties" aria-hidden="true"><span class="icon icon-link"></span></a>MCP Properties</h2>\n<p>The result of <code class="language-text">get_mcp</code> is a polygon. Assuming we are tracking animals via GPS, or observations that polygon has a meaningful spatial context. We are likely interested in some of the properties of that polygon. In previous iterations of this <code class="language-text">get_mcp</code> function I\'ve converted the polygon to one of the <code class="language-text">sp</code> classes to calculate the perimeter and area of the polygon. I\'ve since found formulas to calculate these two properties on any irregular polygon shape.</p>\n<pre class="language-r">area <span class="token operator">&lt;-</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>mat<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  x <span class="token operator">&lt;-</span> mat<span class="token punctuation">[</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span>\n  y <span class="token operator">&lt;-</span> mat<span class="token punctuation">[</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span>\n  n_vert <span class="token operator">&lt;-</span> length<span class="token punctuation">(</span>x<span class="token punctuation">)</span>\n\n  x1 <span class="token operator">&lt;-</span> x<span class="token punctuation">[</span><span class="token number">2</span><span class="token operator">:</span>n_vert<span class="token punctuation">]</span>\n  y1 <span class="token operator">&lt;-</span> y<span class="token punctuation">[</span><span class="token number">2</span><span class="token operator">:</span>n_vert<span class="token punctuation">]</span>\n  x2 <span class="token operator">&lt;-</span> x<span class="token punctuation">[</span><span class="token number">1</span><span class="token operator">:</span>n_vert <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span>\n  y2 <span class="token operator">&lt;-</span> y<span class="token punctuation">[</span><span class="token number">1</span><span class="token operator">:</span>n_vert <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span>\n\n  sum<span class="token punctuation">(</span>x1 <span class="token operator">*</span> y2 <span class="token operator">-</span> y1 <span class="token operator">*</span> x2<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span>\n<span class="token punctuation">}</span>\n\nperimeter <span class="token operator">&lt;-</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>mat<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  x <span class="token operator">&lt;-</span> mat<span class="token punctuation">[</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span>\n  y <span class="token operator">&lt;-</span> mat<span class="token punctuation">[</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span>\n  n_vert <span class="token operator">&lt;-</span> length<span class="token punctuation">(</span>x<span class="token punctuation">)</span>\n  \n  x1 <span class="token operator">&lt;-</span> x<span class="token punctuation">[</span><span class="token number">2</span><span class="token operator">:</span>n_vert<span class="token punctuation">]</span>\n  y1 <span class="token operator">&lt;-</span> y<span class="token punctuation">[</span><span class="token number">2</span><span class="token operator">:</span>n_vert<span class="token punctuation">]</span>\n  x2 <span class="token operator">&lt;-</span> x<span class="token punctuation">[</span><span class="token number">1</span><span class="token operator">:</span>n_vert <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span>\n  y2 <span class="token operator">&lt;-</span> y<span class="token punctuation">[</span><span class="token number">1</span><span class="token operator">:</span>n_vert <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span>\n  \n  sum<span class="token punctuation">(</span>sqrt<span class="token punctuation">(</span><span class="token punctuation">(</span>x1 <span class="token operator">-</span> x2<span class="token punctuation">)</span><span class="token operator">^</span><span class="token number">2</span> <span class="token operator">+</span> <span class="token punctuation">(</span>y1 <span class="token operator">-</span> y2<span class="token punctuation">)</span><span class="token operator">^</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span></pre>\n<p>The value returned by these functions will have a unit based on the units of the input data.</p>\n<h2 id="wrap-up"><a href="#wrap-up" aria-hidden="true"><span class="icon icon-link"></span></a>Wrap Up</h2>\n<p>I\'m one of those people that really likes to peak inside the black box. A part of me really needs to understand the underlying processes for many of the functions and methods I use. Sure, it is easy to just use a function, and I do that sometimes, but without looking inside, I have very little confidence in the results. </p>\n<p>MCPs are very simple. And many of the drawback to using them are legitimate. I generally recommend MCPs if the data is sparse, or comes from trapping grids, etc. I\'ve also heard that MCPs can be used to define the available area in resource selection functions. I don\'t know that I would do that, but decent suggestion if you can justify it. I would reserve MCPs for very rudimentary data exploration or if you can justify their use.</p>\n<p>There are several fields where MCPs are useful. For instance, in self driving cars. The shape of a car can be defined as its MCP. If the MCP isn\'t going to run into anything, then the car wont either. It would be computationally intensive to encode the true shape of the car. The MCP is a good heuristic for self driving cars.</p>\n<p>Extensions to the MCP can been developed. I often use local or daily MCPs to get an idea of an animals movement throughout a single time peroid, then do this over the entire trajectory of an animal. Because of their simplicity, I can do this quickly for animals with many points and many animals. More on that in a future post.</p>\n<p>If you have any questions or suggestions you can <a href="https://github.com/kissmygritts/mgritts.com/issues/2" target="_blank" rel="nofollow noopener noreferrer">leave them here</a>.</p>\n'}}]}}}}}}]);