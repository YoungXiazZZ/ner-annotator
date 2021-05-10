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
            <select
              name="domain"
              id="domain"
              v-model="domain"
              @change="domainSelect">
              <option value="music">music</option>
              <option value="play game">play game</option>
              <option value="weather">weather</option>
            </select>
          </div>
        </div>

        <!-- Intent -->
        <div class="intent">
          <label class="label">
          Intent
          </label>
          <div class="select">
            <select
              name="intent"
              id="intent"
              v-model="intent"
              @change="intentSelect">
              <option value="listen music">listen music</option>
              <option value="skip music">skip music</option>
            </select>
          </div>
        </div>

        <!-- entity -->
        <div class="entity">
          <label class="label">
          Entity
          </label>
          <div class="select">
            <select
              name="entity"
              id="entity"
              v-model="entity"
              @change="entitySelect">
              <option value="entity1">entity1</option>
              <option value="entity2">entity2</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: 'selector',
  data () {
    return {
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
  methods: {
    ...mapMutations(["removeClass", "setCurrentClass"]),
    domainSelect() {
      this.$store.commit("setCurrentClass",this.domain)
    },
    intentSelect() {
      this.$store.commit("setCurrentClass",this.intent)
      
    },
    entitySelect() {
      this.$store.commit("setCurrentClass",this.entity)
    },
    initClass(){
      this.$store.commit("addClass", "music")
      this.$store.commit("addClass", "play game")
      this.$store.commit("addClass", "weather")
      this.$store.commit("addClass", "listen music")
      this.$store.commit("addClass", "skip music")
      this.$store.commit("addClass", "entity1")
      this.$store.commit("addClass", "entity2")
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