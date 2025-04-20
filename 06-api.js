document.addEventListener('DOMContentLoaded', () => {
  // Applique un dégradé linéaire à l'arrière-plan du document
  document.body.style.background = 'linear-gradient(to right,rgb(41, 31, 29),rgb(85, 67, 52))';
  document.body.style.height = '100vh'; // Assure que le dégradé couvre toute la hauteur de la page
  document.body.style.margin = '0'; // Supprime les marges par défaut

  // Applique le style au header
  let header = document.querySelector('header');
  header.style.display = 'flex';
  header.style.backgroundColor = '#ebdef0';
  header.style.color = 'black';
  header.style.textAlign = 'center';
  header.style.justifyContent = 'center';
  header.style.display = 'flex';

  // Ajoutez un message initial "Choisir une commune"
  
  // Sélectionnez ou créez un élément HTML pour afficher les données
  const resultContainer = document.createElement('ul'); // Crée une liste non ordonnée
  document.body.appendChild(resultContainer); // Ajoute la liste au corps de la page

  // Créez une boîte de dialogue personnalisée
  const dialogContainer = document.createElement('div');
  dialogContainer.style.position = 'relative';
  dialogContainer.style.top = '150px'; // Ajoute un margin-top de 150px
  dialogContainer.style.left = '50%';
  dialogContainer.style.transform = 'translateX(-50%)';
  dialogContainer.style.padding = '30px';
  dialogContainer.style.backgroundColor = 'black';
  dialogContainer.style.border = '1px solid #ccc';
  dialogContainer.style.borderRadius = '8px';
  dialogContainer.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
  dialogContainer.style.textAlign = 'center';

  const inputField = document.createElement('input');
  inputField.type = 'text';
  inputField.placeholder = 'Entrez un code postal';
  inputField.style.padding = '10px';
  inputField.style.fontSize = '16px';
  inputField.style.margin = '10px';
  inputField.style.width = '80%';

  const submitButton = document.createElement('button');
  submitButton.textContent = 'Valider';
  submitButton.style.padding = '10px 20px';
  submitButton.style.fontSize = '16px';
  submitButton.style.backgroundColor = '#4CAF50';
  submitButton.style.color = 'white';
  submitButton.style.border = 'none';
  submitButton.style.borderRadius = '5px';
  submitButton.style.cursor = 'pointer';

  // Ajoute les éléments à la boîte de dialogue
  dialogContainer.appendChild(inputField);
  dialogContainer.appendChild(document.createElement('br'));
  dialogContainer.appendChild(submitButton);
  document.body.appendChild(dialogContainer);

  // Ajoute un événement au bouton
  submitButton.addEventListener('click', () => {
    const codePostal = inputField.value.trim();
    if (codePostal) {
      const url = `https://geo.api.gouv.fr/communes?codePostal=${codePostal}`;

      // Supprime la boîte de dialogue
      dialogContainer.style.display = 'none';

      // Supprime le message initial une fois que les données sont récupérées
      fetch(url)
        .then(reponse => reponse.json())
        .then(data => {
          // Masque le message initial
         

          for (let commune of data) {
           

            // Crée un élément de liste pour chaque commune
            const listItem = document.createElement('li');
            listItem.style.border = '1px solid #ccc';
            listItem.style.borderRadius = '8px';
            listItem.style.padding = '15px';
            listItem.style.margin = '10px 0';
            listItem.style.backgroundColor = 'black';
            listItem.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
            listItem.style.textAlign="center" ;
            listItem.innerHTML = `
              <strong style="font-size: 24px; color: #4CAF50;">${commune.nom || "Non spécifié"}</strong><br>
              <span style="font-size: 16px; color: white;">
                <strong>Code postal :</strong> ${codePostal}<br>
                <strong>Code INSEE :</strong> ${commune.code || "Non spécifié"}<br>
                <strong>Population :</strong> ${commune.population || "Non spécifié"}<br>
               
                
              
            `;
            resultContainer.appendChild(listItem);
          }
        })
        .catch(erreur => {
          console.error("Erreur lors de la récupération des données :", erreur);
          const errorMessage = document.createElement('p');
          errorMessage.textContent = "Erreur lors de la récupération des données.";
          errorMessage.style.color = 'red';
          errorMessage.style.fontWeight = 'bold';
          document.body.appendChild(errorMessage);
        });
    } else {
      alert('Veuillez entrer un code postal valide.');
    }
  });
});