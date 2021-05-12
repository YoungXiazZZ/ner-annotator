<template>
  <div class="select-container">
    <section>
      <div class="select-body">
        <!-- domain -->
        <div class="domain">
          <label class="label">
          Domain
          </label>
          <div class="select">
            <!-- <select
              name="domain"
              id="domain"
              v-model="domain"
              @change="domainSelect">
              <option value="music">music</option>
              <option value="play game">play game</option>
              <option value="weather">weather</option>
            </select> -->
            <select v-model="domain">
              <option v-for="item in domainList" :key="item.id" :value="item.id">{{item.id}}</option>
            </select>
          </div>
        </div>

        <!-- Intent -->
        <div class="intent">
          <label class="label">
          Intent
          </label>
          <div class="select">
            <!-- <select
              name="intent"
              id="intent"
              v-model="intent"
              @change="intentSelect">
              <option value="listen music">listen music</option>
              <option value="skip music">skip music</option>
            </select> -->
            <select v-model="intent">
              <option v-for="item in intentList" :key="item.id" :value="item.id">{{item.id}}</option>
            </select>
          </div>
        </div>

        <!-- entity -->
        <div class="entity">
          <label class="label">
          Slot
          </label>
          <div class="select">
            <!-- <select
              name="entity"
              id="entity"
              v-model="entity"
              @change="entitySelect">
              <option value="entity1">entity1</option>
              <option value="entity2">entity2</option>
            </select> -->
            <select v-model="entity" @change="entitySelect">
              <option v-for="item in slotList" :key="item" :value="item">{{item}}</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import {domainRows, intentRows, SlotsRows} from "../options";
export default {
  name: 'selector',
  data () {
    return {
      domainList: [],
      intentList: [],
      slotList: []
    }
  },
  computed: {
    ...mapState(["classes", "currentClass"]),
    domain: {
      get() {
        return this.$store.state.domain
      },
      set(value) {
        this.$store.commit("setDomain",value)
      }
    },
    intent: {
      get() {
        return this.$store.state.intent
      },
      set(value) {
        this.$store.commit("setIntent", value)
      }
    },
    entity: {
      get() {
        return this.$store.state.entity
      },
      set(value) {
        this.$store.commit("setEntity", value)
      }
    }
  },
  created() {
    this.initClass()
  },
  watch:{
        domain:function (val) {
            this.intentList = intentRows.filter(function (x) { return x.pid == val });
            this.intent = this.intentList.length>0 ? this.intentList[0].id : "";
        },
        intent:function (val) {
            this.slotList = SlotsRows.filter(function (x){ return x.pid == val})[0].vals;
            this.entity = this.slotList.length>0 ? this.slotList[0] : "";
        }
    },
  methods: {
    ...mapMutations(["removeClass", "setCurrentClass"]),
    // domainSelect() {
    //   this.$store.commit("setCurrentClass",this.domain)
    // },
    // intentSelect() {
    //   this.$store.commit("setCurrentClass",this.intent)
      
    // },
    entitySelect() {
      this.$store.commit("setCurrentClass",this.entity)
    },
    initClass(){
      this.domainList = domainRows;
      this.domain= this.domainList.length>0 ? this.domainList[0].id : "";

      var val = this.domain;
      this.intentList = intentRows.filter(function (x) { return x.pid == val });
      this.intent = this.intentList.length>0 ? this.intentList[0].id : "";

      val = this.intent;
      this.slotList = SlotsRows.filter(function (x){ return x.pid == val})[0].vals;
      this.entity = this.slotList.length > 0 ? this.slotList[0] : ""

      this.slotList.forEach(element => {
        this.$store.commit("addClass", element)
      });
      this.$store.commit("setCurrentClass",'')
    }
  }

}
</script>
<style lang="scss" scope>
.select-body {
  display: flex;
}
.domain {
  margin-right: 1rem;
}
.intent {
  margin-right: 1rem;
}
</style>