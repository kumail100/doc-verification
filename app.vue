<template>
  <div>
    <h1>AI Document Verifier</h1>
    <input type="file" @change="handleFileUpload" />
    <button @click="verifyDocument">Verify Document</button>
    <p v-if="verification">Verification: {{ verification }}</p>
    <p v-if="transactionId">Blockchain Transaction ID: {{ transactionId }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: null,
      verification: null,
      transactionId: null,
    };
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    verifyDocument() {
      // Upload file to Flask backend for verification
      const formData = new FormData();
      formData.append('file', this.file);

      fetch('http://localhost:5000/verify', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          this.verification = data.verification;
          // If verified, store document hash on-chain
          return fetch('http://localhost:5001/store', {
            method: 'POST',
            body: JSON.stringify({ documentHash: data.hash }),
          });
        })
        .then(response => response.json())
        .then(data => {
          this.transactionId = data.transactionId;
        });
    },
  },
};
</script>
