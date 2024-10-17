import openai
import json
import logging
import pandas as pd
# api_key =""
# client = OpenAI(api_key=api_key)

# Configuration de logging
logging.basicConfig(level=logging.INFO)


# Fonction pour générer les variantes
def generate_variants_with_gpt(row, client, num_variants=5):
    text = row['text']
    label = row['label']
    augmented_texts = []
    generated_texts = set()  # Pour suivre les variantes uniques

    for _ in range(num_variants):
        try:
            logging.info(f"Traitement de la ligne {row.name} pour génération de variantes.")
            response = client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are a creative assistant helping to generate unique sentences inspired by given statements."},
                    {"role": "user", "content": f"Générez une phrase inspirée, avec des variations dans les détails et la structure, pour la phrase suivante : '{text}'"}
                ],
                max_tokens=100,
                temperature=0.7
            )

            # Récupérer le texte de la variante
            response_text = response.choices[0].message.content.strip()

            # Vérifier l'unicité de la variante
            if response_text not in generated_texts:
                augmented_texts.append({"text": response_text, "label": label})
                generated_texts.add(response_text)
                logging.info(f"Variant generated: {response_text}")
            else:
                logging.info(f"Duplicated variant ignored: {response_text}")

        except openai.OpenAIError as e:
            logging.error(f"Erreur lors de la génération de variante pour la ligne '{row.name}' : {e}")
            augmented_texts.append({"text": text, "label": label})  # Utiliser le texte d'origine en cas d'erreur
            
    return augmented_texts


# Chargement de données initiales
data = [
    {"text": "Les nouvelles lois sur la protection des données personnelles ont été approuvées.", "label": "politique"},
    {"text": "Les scientifiques ont trouvé une nouvelle espèce dans la forêt amazonienne.", "label": "non politique"},
    {"text": "Le gouvernement propose de nouvelles réformes fiscales.", "label": "politique"},
    {"text": "Une équipe de chercheurs découvre un lien entre nutrition et santé mentale.", "label": "non politique"},
    # Ajoutez d'autres lignes de base ici pour diversifier les sujets
]

# Conversion des données en DataFrame
df = pd.DataFrame(data)

# Générer les variantes pour chaque ligne
all_variants = []
for index, row in df.iterrows():
    variants = generate_variants_with_gpt(row, client, num_variants=20)  # Générer plus de variantes si besoin
    all_variants.extend(variants)

# Sauvegarde du JSON final
with open('data_variants_enrichis.json', 'w', encoding='utf-8') as f:
    json.dump(all_variants, f, ensure_ascii=False, indent=2)

logging.info("Génération complète et fichier JSON sauvegardé.")