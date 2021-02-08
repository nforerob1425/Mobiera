<template>
  <v-app class="backgroundcustom">
    <v-layout row wrap justify-center mx-3 py-5>
      <v-card class="mx-auto" height="650" max-width="1100" color="rgb(21 130 208 / 24%)">
        <v-container fluid>
          <v-row dense>
            <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
              <v-card>
                <v-img :src="card.src" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px">                >
                  <v-card-title v-text="card.title"></v-card-title>
                  <v-card-text v-text="card.text"></v-card-text>
                </v-img>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-layout>
    <v-footer color="rgb(21 130 208 / 24%)" dark padless>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} — Creado por <strong>Nicolás Forero</strong> 
        <v-divider ></v-divider>
        <v-btn
              color="secondary"
              fab
              x-small
              outlined
              @click="logout()"
            >
              <v-icon>mdi-login-variant</v-icon>
            </v-btn>
      </v-col>
    </v-footer>
  </v-app>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "dashboard",
  components: {},
  data: () => ({
    cards: [
        { title: 'Cartagena de indias', src: 'https://vulcanopro.s3.amazonaws.com/images/lar_bIBKyGglg6Y6KIzwoRSkm36rn248VKTZrMK8AKDN.jpeg', flex: 12, text:'Entre los destinos más exclusivos del mundo para unas vacaciones perfectas se encuentra Cartagena de Indias, la bella ciudad que tanto amamos, nuestro lindo Corralito de Piedra,la ciudad mimada de Colombia y sobre la que más hablan los turistas del mundo. Aquí disfrutamos de lugares mágicos, memorables paisajes y exuberantes playas, en las paradisíacas Islas del Rosario. Por su parte, el centro colonial es el escenario favorito para esperar el atardecer, el ideal para pasar noches románticas y el perfecto para postales de ensueño. Todo en esta ciudad enamora.' },
        { title: 'Hoteles', src: 'https://admin.donde.co/wp-content/uploads/2017/02/SONESTA-ZENIA-VALDELAMAR-1024x683.jpg', flex: 6, text:'Cartagena ofrece infinitas posibilidades para elegir, encontrando lujosos hoteles con vistas espectaculares y una atención completamente exclusiva. Sin importar la elección, de seguro no existirán arrepentimientos porque todos los lugares del Corralito de Piedra' },
        { title: 'Gastronomía', src: 'https://i.ytimg.com/vi/wvAWqaSqiD8/maxresdefault.jpg', flex: 6, text:'Deliciosos aperitivos, platos fuertes y postres que son de buena compañía para disfrutar de momentos especiales con familiares y amigos. Variada y amplia es la gama de restaurantes que ofrecen comida típica caribeña, que encierra mucha cultura' },
        { title: 'Diversión', src: 'https://tutourencartagena.com/wp-content/uploads/2018/05/buceo-en-cartagena-tutourencartagena-cartagena-colombia.jpg', flex: 12, text:'Planes totalmente placenteros, extremos y fascinantes, Cartagena ofrece actividades constantes para disfrutar de la ciudad y divertirse al máximo. El mar, la brisa y el sol, harán parte de la experiencia. En cada rincón hay algo nuevo que descubrir. No existe la rutina porque todo es color y alegría; las noches de Cartagena se hicieron para bailar, desde ritmos caribeños hasta los africanos y cubanos.' },
      ],
  }),
  computed: {
    ...mapState(["workspaceId"])
  },
  methods: {
    logout(){
      this.$router.push("login");
    }
  }
};
</script>
<style scoped>
.backgroundcustom {
  background-image: url("~@/assets/backgroud.jpg") !important;
  position: relative;
  top: 0;
  left: 0;
  background-size: cover !important;
  background-color: whitesmoke !important;
}
</style>
