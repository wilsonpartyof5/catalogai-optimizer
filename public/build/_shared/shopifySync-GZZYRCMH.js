import{a as d}from"/build/_shared/chunk-LCJSGTVF.js";import{e as l}from"/build/_shared/chunk-ZH6I33ZO.js";import"/build/_shared/chunk-Q3IECNXJ.js";var u=`
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
`,p=class{client;constructor(r,t){console.log("\u{1F527} ShopifySyncService constructor [v2]:",{shopDomain:r,accessTokenLength:t?.length||0,accessTokenPrefix:t?.substring(0,10)+"...",endpoint:`https://${r}/admin/api/2025-10/graphql`}),this.testAccessToken(r,t),this.client=new l(`https://${r}/admin/api/2025-10/graphql`,{headers:{"X-Shopify-Access-Token":t,"Content-Type":"application/json"}})}async testAccessToken(r,t){try{console.log("\u{1F9EA} Testing access token with REST API...");let e=await fetch(`https://${r}/admin/api/2025-10/shop.json`,{headers:{"X-Shopify-Access-Token":t,"Content-Type":"application/json"}});if(console.log("\u{1F9EA} REST API test response:",{status:e.status,statusText:e.statusText,ok:e.ok}),e.ok){let n=await e.json();console.log("\u2705 Access token is valid, shop name:",n.shop?.name)}else console.log("\u274C Access token test failed:",e.status,e.statusText)}catch(e){console.log("\u274C Access token test error:",e)}}async syncProducts(r){let t=[],e=!0,n,i=0;console.log("\u{1F504} Starting product sync for user:",r);try{for(;e;){i++,console.log(`\u{1F4C4} Fetching page ${i}${n?` (after: ${n.substring(0,20)}...)`:" (first page)"}`);let s=Date.now(),c=await this.client.request(u,{first:250,after:n}),g=Date.now()-s;console.log(`\u23F1\uFE0F  Page ${i} fetched in ${g}ms`),console.log(`\u{1F4E6} Products in this page: ${c.products.edges.length}`);let y=c.products.edges.map(a=>({id:a.node.id.replace("gid://shopify/Product/",""),title:a.node.title,description:a.node.description||"",handle:a.node.handle,productType:a.node.productType||"",vendor:a.node.vendor||"",tags:a.node.tags||[],variants:a.node.variants.edges.map(o=>({id:o.node.id.replace("gid://shopify/ProductVariant/",""),title:o.node.title,price:o.node.price,compareAtPrice:o.node.compareAtPrice,sku:o.node.sku,inventoryQuantity:o.node.inventoryQuantity,availableForSale:o.node.availableForSale})),metafields:a.node.metafields.edges.map(o=>({id:o.node.id.replace("gid://shopify/Metafield/",""),namespace:o.node.namespace,key:o.node.key,value:o.node.value,type:o.node.type})),images:a.node.images.edges.map(o=>({id:o.node.id.replace("gid://shopify/MediaImage/",""),url:o.node.url,altText:o.node.altText}))}));t.push(...y),console.log(`\u{1F4CA} Total products so far: ${t.length}`),e=c.products.pageInfo.hasNextPage,n=c.products.pageInfo.endCursor,console.log(`\u{1F517} Has next page: ${e}`),e&&(console.log("\u23F3 Waiting 500ms before next request..."),await new Promise(a=>setTimeout(a,500)))}return console.log(`\u2705 Sync complete! Total products: ${t.length}`),await d.log.create({data:{userId:r,type:"sync",message:`Synchronized ${t.length} products from Shopify`,metadata:{productsCount:t.length,timestamp:new Date().toISOString()}}}),t}catch(s){throw console.error("\u274C Sync failed:",s),console.error("\u274C Error details:",{message:s instanceof Error?s.message:"Unknown error",stack:s instanceof Error?s.stack:String(s),pageCount:i,totalProducts:t.length}),await d.log.create({data:{userId:r,type:"error",message:`Failed to sync products: ${s instanceof Error?s.message:"Unknown error"}`,error:s instanceof Error?s.stack:String(s),metadata:{timestamp:new Date().toISOString(),pageCount:i,totalProducts:t.length}}}),s}}async getInventoryLevels(r,t){try{let e=await fetch(`https://${r}/admin/api/2025-10/inventory_levels.json`,{headers:{"X-Shopify-Access-Token":t,"Content-Type":"application/json"}});if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);return(await e.json()).inventory_levels||[]}catch(e){throw console.error("Error fetching inventory levels:",e),e}}async getRecentOrders(r,t,e=50){try{let n=await fetch(`https://${r}/admin/api/2025-10/orders.json?limit=${e}&status=any`,{headers:{"X-Shopify-Access-Token":t,"Content-Type":"application/json"}});if(!n.ok)throw new Error(`HTTP error! status: ${n.status}`);return(await n.json()).orders||[]}catch(n){throw console.error("Error fetching orders:",n),n}}};export{p as ShopifySyncService};
