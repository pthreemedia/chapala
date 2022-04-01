class CollectionSwatch extends HTMLElement {
    constructor() {
      super();
  
      this.activeSwatch = this.querySelector(".swatch-active");
      this.imgContainer = this.closest(".card-wrapper").querySelector(".mainImg");
      this.urlContainer = this.closest(".card-wrapper").querySelectorAll(".product-card-link");
  
      this.querySelectorAll(".card-swatch--color a").forEach((swatch) => {
        swatch.addEventListener("click", this.swatchPicker.bind(this))
      });
      window.addEventListener("load", this.initSwatch());
    }
  
    initSwatch() {
      const imgContainer = this.imgContainer;
      this.querySelectorAll(".card-swatch--color a").forEach((swatch) => {
        const swatchProd = swatch.dataset.varHandle;
        const productInfo = window.theme.swatch_prod[swatchProd];
        if(productInfo) {
            swatch.dataset.swatchImg = productInfo.product_info.featured_image;
          // set url of the product swatch
          swatch.dataset.swatchUrl = `/products/${swatchProd}`;
          const swatchColor = productInfo.swatch_color;
          const swatchImage = productInfo.swatch_image;
          if(swatchImage && swatchImage !== "") {
            swatch.style.backgroundImage = `url("${swatchImage}")`;
            swatch.style.backgroundSize = "cover";
          } else if(swatchColor && swatchColor !== "") {
            if(swatchColor.includes("#FFFFFF") || swatchColor.includes("#ffffff")) {
              swatch.style.backgroundColor = "#fgfgfg";
              swatch.style.borderColor = "#e1e1e1";
            } else {
              swatch.style.backgroundColor = swatchColor;
            }
          }
        } else {
          swatch.parentElement.remove(swatch);
        }
      });
    }
  
    swatchPicker(event) {
      if(event.target === this.activeSwatch) return;
      else {
        const imgContainer = this.imgContainer;
        const linkContainers = this.urlContainer;
  
        this.activeSwatch.classList.remove("swatch-active");
        event.target.classList.add("swatch-active");
        this.activeSwatch = event.target;
        imgContainer.classList.add("switching");
        // console.log("this imgcontainer", this.imgContainer);
  
        const dataHandle = event.target.dataset.varHandle;
        const featuredUrl = event.target.dataset.swatchImg;
        const selectedProdUrl = event.target.dataset.swatchUrl;
  
        if(selectedProdUrl) {
          linkContainers.forEach((link) => {
            link.setAttribute("href", selectedProdUrl);
          });
        }
        if(featuredUrl) {
          setTimeout(function() {
            imgContainer.setAttribute("srcset", featuredUrl);
            imgContainer.addEventListener("load", function() {
              imgContainer.classList.remove("switching");
            });
          }, 100);
        }
      }
    }
  }
  
  customElements.define('collection-swatch', CollectionSwatch);