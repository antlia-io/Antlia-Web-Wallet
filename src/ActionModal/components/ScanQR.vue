<template>
  <div class="scanqr-page">
    <div class="row">
      <div class="col-lg-6 div1bg">
          <!-- <img src="~assets/images/scanbg.png"/> -->
        <div class="scanaddress">
            <div class="scan-content">
                <h2>Scan ANTLIA Address from a QR code</h2>
        </div>
        </div>
        <div class="scan-footer">
             <img src="~assets/images/antlia.svg"/>
        </div>
      </div>
      <div class="col-lg-6 div2bg">
           <div class="scanqr-container">
           <div class="close-btn">
               <router-link to="/">
        <i class="material-icons">close</i>
               </router-link>
           </div>
        <div class="scanqr">
          <img src="~assets/images/qr.png" />
          <!-- <DialogDrag/> -->
 </div>
           </div>
      </div>
    </div>
  </div>
</template>

<script>
// import DialogDrag from 'vue-dialog-drag'

export default {
  name: `scanqr`,
  components: {
// DialogDrag
  },


}
</script>
<style scoped>
.scanqr-page {
  /* background: #1c203e; */
  padding: 0;
  /* height: 100vh; */
  margin: 0;
  z-index: 9999;
  position: fixed;
  top: 20%;
  /* bottom: 10%; */
   left: 20%;
width: 60%;
}
.div1bg{
    /* background: #1c2340; */
    background: url(~assets/images/scanbg.png) no-repeat;
    background-position: left;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    height: 100%;
    padding: 5%;
}
.div2bg{
    background: #f6f6f6;
    /* height: 100vh; */
    
}
.scan-content{
    width: 100%;
    margin: 10rem 0 0;
}
.scan-content h2 {
    color: #fff;
    font-weight: 600;
    line-height: 1.5;
    font-size: 1.5rem;
    text-transform: unset;
    text-align: center;
    width: 300px;
    padding: 1rem;
}
.scan-footer{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 5% 5% 2%;
    }
    .scan-footer img{
    width: 100%;
    max-width: 200px;
    }
.scanaddress {
    display: flex;
    justify-content: center;
    align-items: center;
}
.scanqr-container{
    position: relative;
    display: block;
    height: 100%;
    margin: 5%;
}
.scanqr {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
.scanqr img{
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    background: #fff;
    padding: 3rem;
}
.close-btn {
    position: absolute;
    right: 0;
    top: 0;
    height: 30px;
    width: 30px;
    border: 2px solid #c7c7c7;
    padding: 5px;
    border-radius: 50px;
}
.new {
  display: flex;
  align-items: center;
  height: 100%;
}
.new-content {
  width: 100%;
}
.app-version {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0 0 1.5rem;
}
.app-version .item {
  margin: 0 1rem 0 0;
}
.new-desc {
  padding: 1rem 0;
}
.new-desc h2 {
  font-size: 2.5rem;
  font-weight: 600;
  margin: 0 0 1rem;
}
.new-desc p {
  font-size: 1rem;
  color: #848688;
  text-align: justify;
}
.app-shot {
  display: flex;
  justify-content: center;
  align-items: center;
}
.logo-footer img {
  width: 100%;
}
</style>

