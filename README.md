# User Event Tracker

A microservice for tracking events. This microservice allows you to add, manage and retrieve user related events.


## Applications
- User Behavior Analysis
- Personalization and Recommendation
- A/B Testing and Experimentation
- Marketing and Campaign Tracking
- Customer Support and Troubleshooting
- User Retention and Engagement
- Performance Monitoring and Optimization
- Security and Fraud Detection
- Compliance and Auditing
- Feature Usage Tracking

## Tech Stack
- Express JS (Server)
- Mongo DB (Database)
- Refine (Dashbaord)
- Docker (Containerization)

## Installation (Server)

**1. Clone the repo**
```sh
git clone https://github.com/takumade/user-event-tracker
```

**2. Install Dependencies**
```sh
cd user-event-tracker && npm i
```

**3. Configure and run**

Config you `.env` file

```env
PORT=3000
MONGOOSE_URL=<mongo-url>
```

And run
```sh
npm run start
```

**4. Seeding (optional)**

You can seed the database by running the following command

```sh
npm run seed
```


## Installation (Dashboard)

**1. Clone the repo**
```sh
git clone https://github.com/takumade/user-event-tracker
```

**2. Install Dependencies**

In `user-event-tracker` folder do this
```sh
cd dashboard && npm i
```

**3. Run**

And run
```sh
npm run start
```

## Containerizing

You can also run this app in a docker container.

### Server

**1. Review and add changes**
Review  the Dockerfile and build.sh scripts and edit some changes

**2. Build the script**
Make the script executable:

```sh
chmod +x build.sh
```

Run it:

```sh
./build.sh
```

### Dashboard

**1. Navigate to dashboard directory**
Go to the dashbaord folder

```sh
cd dashbaord
```

**2. Build the script and run**

There are two methods to do so
- `Dockerfile.serve:` Uses serve package. https://www.npmjs.com/package/serve
- `Dockerfile.nginx:` Uses nginx with Gzip config for better performance.


```sh
docker build -t dashboard -f ./Dockerfile.nginx .

docker run -p 5173:80 dashboard

# or

docker build -t vite -f ./Dockerfile.serve .

docker run -p 5173:3000 vite
```