import React from "react";

function useComments(slug, enabled = true) {
  React.useEffect(() => {
    if (!enabled || typeof document === "undefined") {
      return;
    }

    const script = document.createElement("script");

    script.async = true;

    script.innerHTML = `
    /**
     *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
     *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables*/
     /*
     var disqus_config = function () {
     this.page.url = window.location.host;  // Replace PAGE_URL with your page's canonical URL variable
     this.page.identifier = "${slug}"; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
     };
     */
     (function() { // DON'T EDIT BELOW THIS LINE
     var d = document, s = d.createElement('script');
     s.src = 'https://foxesnfriends.disqus.com/embed.js';
     s.setAttribute('data-timestamp', +new Date());
     (d.head || d.body).appendChild(s);
     })();
    `;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [slug, enabled]);
}

export default useComments;
