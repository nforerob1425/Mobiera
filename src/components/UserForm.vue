<template>
    <v-form class="mr-3">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="userName"
            :rules="nameRules"
            label="User Name"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" v-if="!isLogin">
          <v-text-field
            v-model="fullName"
            :rules="nameRules"
            label="Full Name"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Password"
            type="password"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12"  v-if="isLogin">
          <v-btn
            class="mr-4"
            block
            outlined
            elevation="2"
            color="success"
            @click="login()"   
          >
            Login
          </v-btn>
        </v-col>
        
        <v-col cols="12" v-if="!isLogin">
          <v-btn
            class="mr-4"
            block
            outlined
            elevation="2"
            color="success"
            @click="save()"   
          >
            Save
        </v-btn>
        </v-col>
        <v-col cols="12" v-if="isLogin">
        <v-btn
          right
          block
          outlined
          elevation="2"
          color="success white--text"
          @click="create()"
        >
          <v-icon>mdi-plus</v-icon>
          Sign UP
        </v-btn>
        </v-col>
        
      </v-row>
    </v-container>
  </v-form>
</template>
<script>
  export default {
    props: ["isLogin"],
    data: () => ({
      fullName: '',
      userName: '',
      nameRules: [
        v => !!v || 'User name is required',
      ],
      password: '',
      passwordRules: [
        (value) => !!value || 'Please type password.',
        (value) => (value && value.length >= 6) || 'minimum 6 characters',
      ]
    }),
    methods: {
        login(){
          this.$router.push("dashboard");
        },
        save(){
            this.$router.push("dashboard");
        },
        create(){
          this.$router.push("editUser");
        }
    }
  }
</script>