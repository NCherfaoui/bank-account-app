# Projet Spring Boot Microservices

Ce projet est une application basée sur une architecture de microservices utilisant Spring Boot.

## Services

Le projet comprend les microservices suivants :

1. Account Service : Gère les opérations liées aux comptes bancaires.
2. Customer Service : Gère les informations et opérations liées aux clients.
3. Discovery Service : Utilise Eureka pour la découverte et l'enregistrement des services.
4. Gateway Service : Sert de point d'entrée unique pour les requêtes client.
5. Config Service : Centralise la configuration pour tous les microservices.

## Technologies utilisées

- Java 17
- Spring Boot 3.x
- Spring Cloud (pour la découverte de services et le gateway)
- Maven
- Eureka (pour la découverte de services)
- Spring Cloud Gateway
- Spring Cloud Config

## Structure du projet

```
Bank-account-app/
│
├── account-service/
│
├── customer-service/
│
├── discovery-service/
│
├── gateway-service/
│
└── config-service/
```

## Prérequis

- JDK 17
- Maven 3.8+

## Installation et exécution

1. Clonez ce dépôt :
   ```
   git clone https://github.com/NCherfaoui/bank-account-app.git
   ```

2. Naviguez dans chaque dossier de service et compilez le projet :
   ```
   ./mvnw clean install
   ```

3. Lancez les services dans l'ordre suivant :
   - Config Service
   - Discovery Service
   - Gateway Service
   - Customer Service
   - Account Service

   Pour chaque service, exécutez :
   ```
   ./mvnw spring-boot:run
   ```

## Fonctionnalités

- Le service client (customer-service) gère les informations des clients, permet de créer, lire, mettre à jour et
  supprimer des clients.
- Le service de compte (account-service) gère les comptes bancaires, permet de créer des comptes, effectuer des
  transactions, et consulter les soldes.
- Le service de découverte (discovery-service) permet l'enregistrement et la découverte dynamique des microservices.
- Le service de passerelle (gateway-service) route les requêtes vers les services appropriés et peut gérer
  l'authentification.
- Le service de configuration (config-service) centralise la configuration de tous les microservices.

## API Documentation et Interfaces de Service

### Swagger UI

La documentation de l'API est disponible via Swagger UI pour chaque service. Après avoir lancé les services, vous pouvez
accéder à la documentation à :

- Customer Service : `http://localhost:8081/swagger-ui.html`
- Account Service : `http://localhost:8082/swagger-ui.html`

### Eureka Dashboard

L'interface Eureka pour la gestion et la visualisation des services enregistrés est accessible à :

- Eureka Dashboard : `http://localhost:8761`

Cette interface vous permet de voir tous les microservices enregistrés, leur statut, et d'autres informations utiles
pour le diagnostic et la gestion de votre architecture de microservices.

### Gateway

Toutes les requêtes API peuvent être routées à travers le Gateway Service à :

- Gateway : `http://localhost:8888`

Le Gateway Service redirigera les requêtes vers les services appropriés en fonction de la configuration.

## Contribution

Les contributions à ce projet sont les bienvenues. Veuillez suivre ces étapes :

1. Forkez le projet
2. Créez votre branche de fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.