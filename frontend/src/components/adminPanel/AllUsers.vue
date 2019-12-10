<template>
<v-simple-table fixed-header height="650">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left"><h1>#</h1></th>
          <th class="text-left"><h1>User Name</h1></th>
          <th class="text-left"><h1>Email</h1></th>
          <th class="text-left"><h1>Phone</h1></th>
          <th class="text-left"><h1>Role</h1></th>
          <th class="text-left"></th>
          <th class="text-left"></th>
          <th class="text-left"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in users" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.username }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.userPhone }}</td>
          <td>{{ item.role }}</td>
          <td>
            <v-btn text class="success accent-4" v-show="item.role === 'admin' && adminID !== item._id" @click="updateRole(item)">
              Make User
            </v-btn>
            <v-btn text class="success accent-4" v-show="item.role === 'user'" @click="updateRole(item)">
              Make Admin
            </v-btn>
          </td>
          <td>
            <v-btn text class="info darken-1" :to="`/admin/userinfo/${item._id}/${item.username}`">
            View
            </v-btn>
          </td>
          <td>
            <v-btn text class="error darken-1" @click="deleteUser(item._id)">
              Delete
            </v-btn>
          </td>
        </tr>
      </tbody>
    </template>
</v-simple-table>
</template>

<script>
export default {
  data () {
    return {
      users: null,
      adminID: null
    }
  },
  async created () {
    this.users = await this.$store.dispatch('getAllUsers')
    this.adminID = JSON.parse(localStorage.getItem('user'))._id
  },
  methods: {
    updateRole (data) {
      if (data.role === 'admin') {
        data.role = 'user'
      } else {
        data.role = 'admin'
      }
      this.$store.dispatch('changeUser', data)
    },
    deleteUser (id) {
      this.$store.dispatch('removeUser', id)
    }
  }
}
</script>

<style>

</style>
