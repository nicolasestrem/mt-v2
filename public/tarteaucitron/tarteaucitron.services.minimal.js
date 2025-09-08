/*! tarteaucitron.js v1.17.1 | https://github.com/AmauriC/tarteaucitron.js | Copyright 2013-2024 - Amauri Champeaux | License: MIT */
/* Minimal services file - Contains only services used by this site */
/* global tarteaucitron */

// Google Analytics (GA4) Service
tarteaucitron.services.gtag = {
    "key": "gtag",
    "type": "analytic",
    "name": "Google Analytics (GA4)",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": (function () {
        var googleIdentifier = tarteaucitron.user.gtagUa,
            tagUaCookie = '_gat_gtag_' + googleIdentifier,
            tagGCookie = '_ga_' + googleIdentifier;

        tagUaCookie = tagUaCookie.replace(/-/g, '_');
        tagGCookie = tagGCookie.replace(/G-/g, '');

        return ['_ga', '_gat', '_gid', '__utma', '__utmb', '__utmc', '__utmt', '__utmz', tagUaCookie, tagGCookie, '_gcl_au'];
    })(),
    "js": function () {
        "use strict";

        if (tarteaucitron.user.gtagUa === undefined) {
            return;
        }

        window.dataLayer = window.dataLayer || [];
        tarteaucitron.addScript('https://www.googletagmanager.com/gtag/js?id=' + tarteaucitron.user.gtagUa, '', function () {
            window.gtag = function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            var additional_config_info = (typeof timeExpire !== 'undefined') ? {'anonymize_ip': true, 'cookie_expires': timeExpire / 1000} : {'anonymize_ip': true};

            if (tarteaucitron.user.gtagCrossdomain) {
                /**
                 * https://support.google.com/analytics/answer/7476333?hl=en
                 * https://developers.google.com/analytics/devguides/collection/gtagjs/cross-domain
                 */
                gtag('config', tarteaucitron.user.gtagUa, additional_config_info, { linker: { domains: tarteaucitron.user.gtagCrossdomain, } });
            } else {
                gtag('config', tarteaucitron.user.gtagUa, additional_config_info);
            }

            if (typeof tarteaucitron.user.gtagMore === 'function') {
                tarteaucitron.user.gtagMore();
            }
        });
    },
    "fallback": function () {
        if (tarteaucitron.parameters.googleConsentMode === true) {
            if (tarteaucitron.parameters.softConsentMode === false) {
                this.js();
            }
        }
    }
};

// Custom service for LinkedIn/SociableKit widget
tarteaucitron.services.sociablekit = {
    "key": "sociablekit",
    "type": "social",
    "name": "LinkedIn Feed (SociableKit)",
    "uri": "https://sociablekit.com/privacy-policy/",
    "needConsent": true,
    "cookies": ['sk_*', 'linkedin_*'],
    "js": function () {
        "use strict";
        // Detect Brave browser
        var isBrave = (navigator.brave && typeof navigator.brave.isBrave === 'function') || false;
        
        // Load LinkedIn widget when consent is given
        var linkedinContainers = document.querySelectorAll('.linkedin-feed-placeholder');
        linkedinContainers.forEach(function(container) {
            // Store parent reference before replacing container
            var parent = container.parentNode;
            
            var iframe = document.createElement('iframe');
            iframe.src = container.getAttribute('data-src');
            iframe.className = container.getAttribute('data-class') || '';
            iframe.setAttribute('loading', 'lazy');
            iframe.setAttribute('title', 'LinkedIn Feed');
            
            // Add error handling for iframe loading
            iframe.onerror = function() {
                console.warn('LinkedIn widget failed to load');
                // Show fallback for failed load
                var fallbackMsg = document.createElement('div');
                fallbackMsg.className = 'linkedin-fallback-message';
                fallbackMsg.innerHTML = '<p style="text-align: center; padding: 2rem;">Das LinkedIn-Widget konnte nicht geladen werden.<br><a href="https://www.linkedin.com/showcase/mobility-trailblazers/" target="_blank" style="color: #0077b5; text-decoration: underline;">Besuchen Sie uns direkt auf LinkedIn →</a></p>';
                // Use the iframe's parent since iframe is now in the DOM
                if (iframe.parentNode) {
                    iframe.parentNode.replaceChild(fallbackMsg, iframe);
                }
            };
            
            // For Brave browser, add a timeout check
            if (isBrave) {
                setTimeout(function() {
                    // Check if iframe actually loaded content
                    try {
                        var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                        if (!iframeDoc || iframeDoc.body.innerHTML === '') {
                            iframe.onerror();
                        }
                    } catch(e) {
                        // Cross-origin, assume it loaded
                    }
                }, 3000);
            }
            
            // Replace container with iframe
            parent.replaceChild(iframe, container);
        });
    },
    "fallback": function () {
        "use strict";
        // Show consent placeholder when consent is not given
        var linkedinContainers = document.querySelectorAll('.linkedin-feed-placeholder');
        linkedinContainers.forEach(function(container) {
            if (!container.querySelector('.tarteaucitron-placeholder')) {
                var placeholder = document.createElement('div');
                placeholder.className = 'tarteaucitron-placeholder';
                placeholder.innerHTML = '<strong>LinkedIn Feed</strong><br>Um den LinkedIn Feed anzuzeigen, müssen Sie die Cookies akzeptieren.';
                container.appendChild(placeholder);
            }
        });
    }
};