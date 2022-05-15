--
-- PostgreSQL database dump
--

-- Dumped from database version 13.6 (Debian 13.6-1.pgdg110+1)
-- Dumped by pg_dump version 14.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: CredentialChangeRequestStatus; Type: TYPE; Schema: public; Owner: qualkey
--

CREATE TYPE public."CredentialChangeRequestStatus" AS ENUM (
    'PENDING',
    'APPROVED',
    'REJECTED'
);


ALTER TYPE public."CredentialChangeRequestStatus" OWNER TO qualkey;

--
-- Name: CredentialStatus; Type: TYPE; Schema: public; Owner: qualkey
--

CREATE TYPE public."CredentialStatus" AS ENUM (
    'NEW',
    'UPLOADING_TO_BLOCKCHAIN',
    'FAILED_UPLOADING_TO_BLOCKCHAIN',
    'UPLOADED_TO_BLOCKCHAIN',
    'ACTIVATED',
    'WITHDRAWN'
);


ALTER TYPE public."CredentialStatus" OWNER TO qualkey;

--
-- Name: InsitutionStatus; Type: TYPE; Schema: public; Owner: qualkey
--

CREATE TYPE public."InsitutionStatus" AS ENUM (
    'ACTIVE',
    'CLOSED'
);


ALTER TYPE public."InsitutionStatus" OWNER TO qualkey;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: qualkey
--

CREATE TYPE public."Role" AS ENUM (
    'SUPER_ADMIN',
    'ADMIN',
    'INSTITUTION_REPRESENTATIVE',
    'STUDENT'
);


ALTER TYPE public."Role" OWNER TO qualkey;

--
-- Name: TransactionStatus; Type: TYPE; Schema: public; Owner: qualkey
--

CREATE TYPE public."TransactionStatus" AS ENUM (
    'NEW',
    'PENDING',
    'CONFIRMED',
    'FAILED'
);


ALTER TYPE public."TransactionStatus" OWNER TO qualkey;

--
-- Name: UploadStatus; Type: TYPE; Schema: public; Owner: qualkey
--

CREATE TYPE public."UploadStatus" AS ENUM (
    'PENDING',
    'APPROVED',
    'REJECTED'
);


ALTER TYPE public."UploadStatus" OWNER TO qualkey;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: qualkey
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO qualkey;

--
-- Name: credentialChangeRequests; Type: TABLE; Schema: public; Owner: qualkey
--

CREATE TABLE public."credentialChangeRequests" (
    uuid text NOT NULL,
    status public."CredentialChangeRequestStatus" DEFAULT 'PENDING'::public."CredentialChangeRequestStatus" NOT NULL,
    "requestedBy" text NOT NULL,
    "confirmedBy" text NOT NULL,
    "changedFrom" text NOT NULL,
    "changedTo" text NOT NULL,
    "fieldName" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."credentialChangeRequests" OWNER TO qualkey;

--
-- Name: credentialChanges; Type: TABLE; Schema: public; Owner: qualkey
--

CREATE TABLE public."credentialChanges" (
    id integer NOT NULL,
    "credentialUuid" text NOT NULL,
    "changedByUuid" text NOT NULL,
    "changedFrom" text NOT NULL,
    "changedTo" text NOT NULL,
    "fieldName" text NOT NULL,
    "changedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    hash text NOT NULL
);


ALTER TABLE public."credentialChanges" OWNER TO qualkey;

--
-- Name: credentialChanges_id_seq; Type: SEQUENCE; Schema: public; Owner: qualkey
--

CREATE SEQUENCE public."credentialChanges_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."credentialChanges_id_seq" OWNER TO qualkey;

--
-- Name: credentialChanges_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: qualkey
--

ALTER SEQUENCE public."credentialChanges_id_seq" OWNED BY public."credentialChanges".id;


--
-- Name: credentialShares; Type: TABLE; Schema: public; Owner: qualkey
--

CREATE TABLE public."credentialShares" (
    uuid text NOT NULL,
    "recipientEmail" text NOT NULL,
    "viewsCount" integer DEFAULT 0 NOT NULL,
    "credentialUuid" text NOT NULL,
    "temporaryPassword" text NOT NULL,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."credentialShares" OWNER TO qualkey;

--
-- Name: credentials; Type: TABLE; Schema: public; Owner: qualkey
--

CREATE TABLE public.credentials (
    uuid text NOT NULL,
    did text NOT NULL,
    status public."CredentialStatus" NOT NULL,
    "studentUuid" text NOT NULL,
    "institutionUuid" text NOT NULL,
    "certificateId" text,
    "graduatedName" text,
    "authenticatedBy" text,
    "qualificationName" text,
    majors text,
    minors text,
    "authenticatedTitle" text,
    "awardingInstitution" text,
    "qualificationLevel" text,
    "awardLevel" text,
    "studyLanguage" text,
    info text,
    "gpaFinalGrade" text,
    "authenticatedAt" timestamp(3) without time zone,
    "studyStartedAt" timestamp(3) without time zone,
    "studyEndedAt" timestamp(3) without time zone,
    "graduatedAt" timestamp(3) without time zone,
    "expiresAt" timestamp(3) without time zone
);


ALTER TABLE public.credentials OWNER TO qualkey;

--
-- Name: institutions; Type: TABLE; Schema: public; Owner: qualkey
--

CREATE TABLE public.institutions (
    uuid text NOT NULL,
    status public."InsitutionStatus" DEFAULT 'ACTIVE'::public."InsitutionStatus" NOT NULL,
    "emailDomain" text NOT NULL,
    "logoUrl" text,
    name text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.institutions OWNER TO qualkey;

--
-- Name: transactions; Type: TABLE; Schema: public; Owner: qualkey
--

CREATE TABLE public.transactions (
    uuid text NOT NULL,
    status public."TransactionStatus" DEFAULT 'NEW'::public."TransactionStatus" NOT NULL,
    "credentialUuid" text NOT NULL,
    fee text,
    hash text,
    hex text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "confirmedAt" timestamp(3) without time zone
);


ALTER TABLE public.transactions OWNER TO qualkey;

--
-- Name: uploads; Type: TABLE; Schema: public; Owner: qualkey
--

CREATE TABLE public.uploads (
    uuid text NOT NULL,
    status public."UploadStatus" DEFAULT 'PENDING'::public."UploadStatus" NOT NULL,
    "uploadedBy" text NOT NULL,
    "confirmationsRequestedFrom" text NOT NULL,
    "confirmedBy" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    mapping text NOT NULL,
    filename text NOT NULL
);


ALTER TABLE public.uploads OWNER TO qualkey;

--
-- Name: users; Type: TABLE; Schema: public; Owner: qualkey
--

CREATE TABLE public.users (
    uuid text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    role public."Role" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "firstName" text,
    "lastName" text,
    "institutionUuid" text
);


ALTER TABLE public.users OWNER TO qualkey;

--
-- Name: credentialChanges id; Type: DEFAULT; Schema: public; Owner: qualkey
--

ALTER TABLE ONLY public."credentialChanges" ALTER COLUMN id SET DEFAULT nextval('public."credentialChanges_id_seq"'::regclass);


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: qualkey
--

INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('4b425046-2386-4116-8618-7c3b9b605d7e', '75d5da9a79d298d97e025d0e270f59e8cec26569da5a5959bf55988f13a837f0', '2022-04-27 21:27:52.781552+00', '20220427134050_init', NULL, NULL, '2022-04-27 21:27:52.769912+00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('c694e44f-e28c-4a3b-b6bb-545dcb94d1f3', '75d5da9a79d298d97e025d0e270f59e8cec26569da5a5959bf55988f13a837f0', '2022-04-27 13:48:56.073734+00', '20220427134050_init', NULL, NULL, '2022-04-27 13:48:56.052726+00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('f7c4efdb-ad07-4bbf-95b3-3fe640a30f54', '7f6c78e32d7eb2466d6e4ca9e1ba0ca17018f92e5703915ee06263133cc4d1e4', '2022-05-06 15:36:27.156577+00', '20220429224530_update_models_30_04', NULL, NULL, '2022-05-06 15:36:27.120806+00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('13f5e6ea-245c-4525-859f-458316a5f037', '56f3d4090d8f90c1381da67d2da5ef43a843690c0e19de0405c285db4a8a6592', '2022-05-06 15:36:27.163625+00', '20220429225129_update_models_30_04_defaults', NULL, NULL, '2022-05-06 15:36:27.1593+00', 1);


--
-- Data for Name: credentialChangeRequests; Type: TABLE DATA; Schema: public; Owner: qualkey
--



--
-- Data for Name: credentialChanges; Type: TABLE DATA; Schema: public; Owner: qualkey
--



--
-- Data for Name: credentialShares; Type: TABLE DATA; Schema: public; Owner: qualkey
--



--
-- Data for Name: credentials; Type: TABLE DATA; Schema: public; Owner: qualkey
--



--
-- Data for Name: institutions; Type: TABLE DATA; Schema: public; Owner: qualkey
--

INSERT INTO public.institutions (uuid, status, "emailDomain", "logoUrl", name, "createdAt", "updatedAt") VALUES ('89f43c8f-1434-4caf-92bd-990b3f112da1', 'ACTIVE', 'web3app', NULL, 'Testio', '2022-05-08 22:37:57', '2022-05-08 22:37:59');


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: qualkey
--



--
-- Data for Name: uploads; Type: TABLE DATA; Schema: public; Owner: qualkey
--

INSERT INTO public.uploads (uuid, status, "uploadedBy", "confirmationsRequestedFrom", "confirmedBy", "createdAt", "updatedAt", mapping, filename) VALUES ('3d7eb8d0-3c11-41ea-ab1e-9fa2157a5c8d', 'APPROVED', '4728859d-622b-4ec0-8f60-75caa0d17c13', '4728859d-622b-4ec0-8f60-75caa0d17c13', NULL, '2022-05-10 14:13:52.911', '2022-05-10 14:13:52.932', 'email,expiresAt,graduatedName,gpaFinalGrade,graduatedAt,qualificationLevel,qualificationName,studyEndedAt,,,studyStartedAt,,,,,', '3d7eb8d0-3c11-41ea-ab1e-9fa2157a5c8d.csv');
INSERT INTO public.uploads (uuid, status, "uploadedBy", "confirmationsRequestedFrom", "confirmedBy", "createdAt", "updatedAt", mapping, filename) VALUES ('37a4f337-d1f7-4a5b-aac3-5033a8710136', 'APPROVED', '4728859d-622b-4ec0-8f60-75caa0d17c13', '4728859d-622b-4ec0-8f60-75caa0d17c13', NULL, '2022-05-10 14:15:35.708', '2022-05-10 14:15:35.715', 'email,expiresAt,graduatedName,gpaFinalGrade,graduatedAt,qualificationLevel,qualificationName,studyEndedAt,studyStartedAt,,,,,,,', '37a4f337-d1f7-4a5b-aac3-5033a8710136.xls');
INSERT INTO public.uploads (uuid, status, "uploadedBy", "confirmationsRequestedFrom", "confirmedBy", "createdAt", "updatedAt", mapping, filename) VALUES ('dcbd588f-d63a-4b60-8f1f-d9881bfb7417', 'APPROVED', '4728859d-622b-4ec0-8f60-75caa0d17c13', '4728859d-622b-4ec0-8f60-75caa0d17c13', NULL, '2022-05-10 14:40:50.17', '2022-05-10 14:40:50.196', 'email,expiresAt,graduatedName,gpaFinalGrade,graduatedAt,qualificationLevel,qualificationName,studyEndedAt,studyStartedAt,,,,,,,', 'dcbd588f-d63a-4b60-8f1f-d9881bfb7417.csv');
INSERT INTO public.uploads (uuid, status, "uploadedBy", "confirmationsRequestedFrom", "confirmedBy", "createdAt", "updatedAt", mapping, filename) VALUES ('4e8aa6d1-c9a2-450b-a37d-13f0304b10e2', 'APPROVED', '4728859d-622b-4ec0-8f60-75caa0d17c13', '4728859d-622b-4ec0-8f60-75caa0d17c13', NULL, '2022-05-11 16:19:57.645', '2022-05-11 16:19:57.666', ',,,,,,,,,,,,,,,', '4e8aa6d1-c9a2-450b-a37d-13f0304b10e2.csv');
INSERT INTO public.uploads (uuid, status, "uploadedBy", "confirmationsRequestedFrom", "confirmedBy", "createdAt", "updatedAt", mapping, filename) VALUES ('77db2df8-92aa-4434-91dd-1c237fd14acc', 'APPROVED', '4728859d-622b-4ec0-8f60-75caa0d17c13', '4728859d-622b-4ec0-8f60-75caa0d17c13', NULL, '2022-05-10 14:28:28.09', '2022-05-10 14:28:28.099', 'email,expiresAt,graduatedName,graduatedAt,gpaFinalGrade,qualificationLevel,qualificationName,studyEndedAt,studyStartedAt,,,,,,,', '77db2df8-92aa-4434-91dd-1c237fd14acc.csv');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: qualkey
--

INSERT INTO public.users (uuid, email, password, role, "createdAt", "updatedAt", "firstName", "lastName", "institutionUuid") VALUES ('bf4fe6f3-f5a1-4794-aced-4deb4ba8c67a', 'student@student.com', '$2a$10$szluigxiqw0EjjrAULtU.OrQH9ar/aTkZttoaqwvnS0u39tcVuxG.', 'STUDENT', '2022-04-28 10:35:09.983', '2022-04-28 10:35:09.983', 'Student', 'Student', NULL);
INSERT INTO public.users (uuid, email, password, role, "createdAt", "updatedAt", "firstName", "lastName", "institutionUuid") VALUES ('00e5daba-fd08-4146-af73-deb67e6dd2ea', 'admin@admin.com', '$2a$10$6X/3no1.v5A3ygHPMGF7a.FKaOa2TkekqsWIq9ADRBOOm8Y1CcrgW', 'SUPER_ADMIN', '2022-04-27 22:10:57', '2022-04-27 22:11:34', 'Admin', 'Admin', NULL);
INSERT INTO public.users (uuid, email, password, role, "createdAt", "updatedAt", "firstName", "lastName", "institutionUuid") VALUES ('4728859d-622b-4ec0-8f60-75caa0d17c13', 'institution@institution.com', '$2a$10$vz2liRFu3Ho7rLdEInKO5./ZjUsynDfhLTuaIRqdNLh0ewCfILZKG', 'INSTITUTION_REPRESENTATIVE', '2022-04-28 10:36:50.567', '2022-04-28 10:36:50.567', 'Institution', 'Institution', '89f43c8f-1434-4caf-92bd-990b3f112da1');


--
-- Name: credentialChanges_id_seq; Type: SEQUENCE SET; Schema: public; Owner: qualkey
--

SELECT pg_catalog.setval('public."credentialChanges_id_seq"', 1, false);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: qualkey
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: credentialChangeRequests credentialChangeRequests_pkey; Type: CONSTRAINT; Schema: public; Owner: qualkey
--

ALTER TABLE ONLY public."credentialChangeRequests"
    ADD CONSTRAINT "credentialChangeRequests_pkey" PRIMARY KEY (uuid);


--
-- Name: credentialChanges credentialChanges_pkey; Type: CONSTRAINT; Schema: public; Owner: qualkey
--

ALTER TABLE ONLY public."credentialChanges"
    ADD CONSTRAINT "credentialChanges_pkey" PRIMARY KEY (id);


--
-- Name: credentialShares credentialShares_pkey; Type: CONSTRAINT; Schema: public; Owner: qualkey
--

ALTER TABLE ONLY public."credentialShares"
    ADD CONSTRAINT "credentialShares_pkey" PRIMARY KEY (uuid);


--
-- Name: credentials credentials_pkey; Type: CONSTRAINT; Schema: public; Owner: qualkey
--

ALTER TABLE ONLY public.credentials
    ADD CONSTRAINT credentials_pkey PRIMARY KEY (uuid);


--
-- Name: institutions institutions_pkey; Type: CONSTRAINT; Schema: public; Owner: qualkey
--

ALTER TABLE ONLY public.institutions
    ADD CONSTRAINT institutions_pkey PRIMARY KEY (uuid);


--
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: qualkey
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (uuid);


--
-- Name: uploads uploads_pkey; Type: CONSTRAINT; Schema: public; Owner: qualkey
--

ALTER TABLE ONLY public.uploads
    ADD CONSTRAINT uploads_pkey PRIMARY KEY (uuid);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: qualkey
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (uuid);


--
-- Name: credentials_did_key; Type: INDEX; Schema: public; Owner: qualkey
--

CREATE UNIQUE INDEX credentials_did_key ON public.credentials USING btree (did);


--
-- Name: institutions_emailDomain_key; Type: INDEX; Schema: public; Owner: qualkey
--

CREATE UNIQUE INDEX "institutions_emailDomain_key" ON public.institutions USING btree ("emailDomain");


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: qualkey
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: credentials credentials_institutionUuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: qualkey
--

ALTER TABLE ONLY public.credentials
    ADD CONSTRAINT "credentials_institutionUuid_fkey" FOREIGN KEY ("institutionUuid") REFERENCES public.institutions(uuid) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: credentials credentials_studentUuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: qualkey
--

ALTER TABLE ONLY public.credentials
    ADD CONSTRAINT "credentials_studentUuid_fkey" FOREIGN KEY ("studentUuid") REFERENCES public.users(uuid) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: users users_institutionUuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: qualkey
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "users_institutionUuid_fkey" FOREIGN KEY ("institutionUuid") REFERENCES public.institutions(uuid) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

