import{a as d}from"/build/_shared/chunk-KADRYHQJ.js";import"/build/_shared/chunk-Q3IECNXJ.js";var y=`
  query getProducts($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          title
          description
          handle
          productType
          vendor
          tags
          variants(first: 100) {
            edges {
              node {
                id
                title
                price
                compareAtPrice
                sku
                inventoryQuantity
                availableForSale
              }
            }
          }
          metafields(first: 100) {
            edges {
              node {
                id
                namespace
                key
                value
                type
              }
            }
          }
          images(first: 10) {
            edges {
              node {
                id
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`,p=class{client;shopDomain;accessToken;constructor(s,r){console.log("\u{1F527} ShopifySyncService constructor [v2]:",{shopDomain:s,accessTokenLength:r?.length||0,accessTokenPrefix:r?.substring(0,10)+"...",endpoint:`https://${s}/admin/api/2025-10/graphql`}),this.shopDomain=s,this.accessToken=r,this.testAccessToken(s,r)}async initializeClient(){if(!this.client){let{GraphQLClient:s}=await import("/build/_shared/main-O2SMKY2T.js");this.client=new s(`https://${this.shopDomain}/admin/api/2025-10/graphql`,{headers:{"X-Shopify-Access-Token":this.accessToken,"Content-Type":"application/json"}})}return this.client}async testAccessToken(s,r){try{console.log("\u{1F9EA} Testing access token with REST API...");let e=await fetch(`https://${s}/admin/api/2025-10/shop.json`,{headers:{"X-Shopify-Access-Token":r,"Content-Type":"application/json"}});if(console.log("\u{1F9EA} REST API test response:",{status:e.status,statusText:e.statusText,ok:e.ok}),e.ok){let n=await e.json();console.log("\u2705 Access token is valid, shop name:",n.shop?.name)}else console.log("\u274C Access token test failed:",e.status,e.statusText)}catch(e){console.log("\u274C Access token test error:",e)}}async syncProducts(s){let r=await this.initializeClient(),e=[],n=!0,i,c=0;console.log("\u{1F504} Starting product sync for user:",s);try{for(;n;){c++,console.log(`\u{1F4C4} Fetching page ${c}${i?` (after: ${i.substring(0,20)}...)`:" (first page)"}`);let o=Date.now(),l=await r.request(y,{first:250,after:i}),g=Date.now()-o;console.log(`\u23F1\uFE0F  Page ${c} fetched in ${g}ms`),console.log(`\u{1F4E6} Products in this page: ${l.products.edges.length}`);let h=l.products.edges.map(a=>({id:a.node.id.replace("gid://shopify/Product/",""),title:a.node.title,description:a.node.description||"",handle:a.node.handle,productType:a.node.productType||"",vendor:a.node.vendor||"",tags:a.node.tags||[],variants:a.node.variants.edges.map(t=>({id:t.node.id.replace("gid://shopify/ProductVariant/",""),title:t.node.title,price:t.node.price,compareAtPrice:t.node.compareAtPrice,sku:t.node.sku,inventoryQuantity:t.node.inventoryQuantity,availableForSale:t.node.availableForSale})),metafields:a.node.metafields.edges.map(t=>({id:t.node.id.replace("gid://shopify/Metafield/",""),namespace:t.node.namespace,key:t.node.key,value:t.node.value,type:t.node.type})),images:a.node.images.edges.map(t=>({id:t.node.id.replace("gid://shopify/MediaImage/",""),url:t.node.url,altText:t.node.altText}))}));e.push(...h),console.log(`\u{1F4CA} Total products so far: ${e.length}`),n=l.products.pageInfo.hasNextPage,i=l.products.pageInfo.endCursor,console.log(`\u{1F517} Has next page: ${n}`),n&&(console.log("\u23F3 Waiting 500ms before next request..."),await new Promise(a=>setTimeout(a,500)))}return console.log(`\u2705 Sync complete! Total products: ${e.length}`),await d.log.create({data:{userId:s,type:"sync",message:`Synchronized ${e.length} products from Shopify`,metadata:{productsCount:e.length,timestamp:new Date().toISOString()}}}),e}catch(o){throw console.error("\u274C Sync failed:",o),console.error("\u274C Error details:",{message:o instanceof Error?o.message:"Unknown error",stack:o instanceof Error?o.stack:String(o),pageCount:c,totalProducts:e.length}),await d.log.create({data:{userId:s,type:"error",message:`Failed to sync products: ${o instanceof Error?o.message:"Unknown error"}`,error:o instanceof Error?o.stack:String(o),metadata:{timestamp:new Date().toISOString(),pageCount:c,totalProducts:e.length}}}),o}}async getInventoryLevels(s,r){try{let e=await fetch(`https://${s}/admin/api/2025-10/inventory_levels.json`,{headers:{"X-Shopify-Access-Token":r,"Content-Type":"application/json"}});if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);return(await e.json()).inventory_levels||[]}catch(e){throw console.error("Error fetching inventory levels:",e),e}}async getRecentOrders(s,r,e=50){try{let n=await fetch(`https://${s}/admin/api/2025-10/orders.json?limit=${e}&status=any`,{headers:{"X-Shopify-Access-Token":r,"Content-Type":"application/json"}});if(!n.ok)throw new Error(`HTTP error! status: ${n.status}`);return(await n.json()).orders||[]}catch(n){throw console.error("Error fetching orders:",n),n}}};export{p as ShopifySyncService};
