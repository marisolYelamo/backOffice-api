--
-- PostgreSQL database dump
--

-- Dumped from database version 12.9
-- Dumped by pg_dump version 13.4

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
-- Name: courseMode; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."courseMode" AS ENUM (
    'Online',
    'Online / En Vivo'
);


ALTER TYPE public."courseMode" OWNER TO postgres;

--
-- Name: courseShift; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."courseShift" AS ENUM (
    'full time',
    'mañana',
    'tarde'
);


ALTER TYPE public."courseShift" OWNER TO postgres;

--
-- Name: courseStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."courseStatus" AS ENUM (
    'disponible',
    'en curso',
    'finalizado'
);

ALTER TYPE public."courseStatus" OWNER TO postgres;

--
-- Name: months; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.months AS ENUM (
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre'
);


ALTER TYPE public.months OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: courses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.courses (
    id integer NOT NULL,
    type integer NOT NULL,
    year integer NOT NULL,
    month public.months NOT NULL,
    mode public."courseMode" NOT NULL,
    "startDate" date NOT NULL,
    "endDate" date NOT NULL,
    "startHour" time without time zone NOT NULL,
    "endHour" time without time zone NOT NULL,
    shift public."courseShift" DEFAULT 'full time'::public."courseShift",
    "weekDays" character varying(50) NOT NULL,
    "cohortLabel" character varying(50) NOT NULL,
    availability boolean DEFAULT true,
    "limitToApply" date NOT NULL,
    "limitOfStudents" integer NOT NULL,
    "priceARS" numeric NOT NULL,
    "priceUSD" numeric NOT NULL,
    status public."courseStatus" DEFAULT 'disponible'::public."courseStatus",
    visibility boolean DEFAULT false
);


ALTER TABLE public.courses OWNER TO postgres;

--
-- Name: courses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.courses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.courses_id_seq OWNER TO postgres;

--
-- Name: courses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.courses_id_seq OWNED BY public.courses.id;


--
-- Name: modules; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.modules (
    id integer NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.modules OWNER TO postgres;

--
-- Name: modules_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.modules_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.modules_id_seq OWNER TO postgres;

--
-- Name: modules_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.modules_id_seq OWNED BY public.modules.id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_id_seq OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: typesOfCourses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."typesOfCourses" (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    tag character varying(50) NOT NULL
);


ALTER TABLE public."typesOfCourses" OWNER TO postgres;

--
-- Name: typesOfCourses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."typesOfCourses_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."typesOfCourses_id_seq" OWNER TO postgres;

--
-- Name: typesOfCourses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."typesOfCourses_id_seq" OWNED BY public."typesOfCourses".id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    "firstName" character varying(50) NOT NULL,
    "lastName" character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    password character varying NOT NULL,
    "secretKey" character varying NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: users_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_roles (
    id integer NOT NULL,
    "idUser" integer NOT NULL,
    "idRole" integer NOT NULL,
    "idModule" integer NOT NULL
);


ALTER TABLE public.users_roles OWNER TO postgres;

--
-- Name: users_roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_roles_id_seq OWNER TO postgres;

--
-- Name: users_roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_roles_id_seq OWNED BY public.users_roles.id;


--
-- Name: courses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses ALTER COLUMN id SET DEFAULT nextval('public.courses_id_seq'::regclass);


--
-- Name: modules id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modules ALTER COLUMN id SET DEFAULT nextval('public.modules_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: typesOfCourses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."typesOfCourses" ALTER COLUMN id SET DEFAULT nextval('public."typesOfCourses_id_seq"'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: users_roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_roles ALTER COLUMN id SET DEFAULT nextval('public.users_roles_id_seq'::regclass);


--
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.courses (id, type, year, month, mode, "startDate", "endDate", "startHour", "endHour", shift, "weekDays", "cohortLabel", availability, "limitToApply", "limitOfStudents", "priceARS", "priceUSD", status, visibility) FROM stdin;
31	4	2022	enero	Online	2022-04-03	2022-03-07	04:42:00	23:05:00	full time	Lunes y Martes	INTRO_JAVASCRIPT_ATR-2022-ENERO-FULL TIME-953Q	t	2022-12-23	100	1340	2342	disponible	t
34	2	2022	julio	Online	2022-07-06	2022-08-18	10:00:00	13:00:00	mañana	Lun, Mie y Vie	INTRO_JAVASCRIPT-2022-JULIO-MAÑANA-EFAC	t	2022-07-08	100	17900	100	disponible	t
33	2	2022	junio	Online	2022-06-16	2022-07-15	18:30:00	21:30:00	tarde	Lun, Mar, Mie y Vie	INTRO_JAVASCRIPT-2022-JUNIO-TARDE-S2DN	t	2022-06-03	100	17900	100	disponible	f
32	2	2022	junio	Online	2022-06-07	2022-07-15	10:00:00	13:00:00	mañana	Lun, Mie y Vie	INTRO_JAVASCRIPT-2022-JUNIO-MAÑANA-BLW6	t	2022-06-02	100	17900	100	disponible	f
35	2	2022	julio	Online	2022-07-06	2022-08-18	18:30:00	21:30:00	tarde	Lun, Mie y Vie	INTRO_JAVASCRIPT-2022-JULIO-TARDE-5IDA	f	2022-08-08	100	17900	100	disponible	t
\.


--
-- Data for Name: modules; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.modules (id, name) FROM stdin;
1	data
2	users
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, name) FROM stdin;
1	admin
2	editor
3	viewer
\.


--
-- Data for Name: typesOfCourses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."typesOfCourses" (id, name, tag) FROM stdin;
3	Programacion  PR
1	Poesia  PO
2	Diseño  DI
4	Japones  JA
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, "firstName", "lastName", email, password, "secretKey") FROM stdin;
3	Nahue	Bonader	nahuel@plataforma5.la	$2b$10$JEpYEpLjBpzMsUOMs26gpeI0ciaDff3VPutCoQ1agJDJSAQ78CYUW	2c4d81aab2c04a86ba9f7b199bfac054
5	Agus	Montañez	agustina@plataforma5.la	$2b$10$JEpYEpLjBpzMsUOMs26gpeI0ciaDff3VPutCoQ1agJDJSAQ78CYUW	2c4d81aab2c04a86ba9f7b199bfac054
6	Diego	Jofre	diego@plataforma5.la	$2b$10$JEpYEpLjBpzMsUOMs26gpeI0ciaDff3VPutCoQ1agJDJSAQ78CYUW	2c4d81aab2c04a86ba9f7b199bfac054
7	Lucas	Escudero	lucas.escudero@plataforma5.la	$2b$10$JEpYEpLjBpzMsUOMs26gpeI0ciaDff3VPutCoQ1agJDJSAQ78CYUW	2c4d81aab2c04a86ba9f7b199bfac054
2	Jules	Novoa	julia@plataforma5.la	$2b$10$JEpYEpLjBpzMsUOMs26gpeI0ciaDff3VPutCoQ1agJDJSAQ78CYUW	d6afd120cbd211ec912277687a15679a
1	Facu	Velasco	facu@plataforma5.la	$2b$10$JEpYEpLjBpzMsUOMs26gpeI0ciaDff3VPutCoQ1agJDJSAQ78CYUW	ed7ed690d1f811ec912277687a15679a
8	Gigi	Campos	gigi@plataforma5.la	$2b$10$FilR67zro5l4/4t9bG8YtOlZ8tcTq/xauG5SofsR0yDHVGxtxbg7u	e6073060d22011ec912277687a15679a
9	Day	Estrada	day@plataforma5.la	$2b$10$yGHbPGlL.mOEc1.SnDuTteVMBlEsWCSAg17KDonkwutWOR4onDv3e	42f1f670d22111ec912277687a15679a
10	Lu	Melmik	lucia@plataforma5.la	$2b$10$xpGkhEcrBx0u/y0Ubjfcuezaqe2KBeH74BkrJMklIfRKw74tvV07e	627bb170d22111ec912277687a15679a
11	Jules	Amerikaner	jules@plataforma5.la	$2b$10$gVsaKBLYUL3PDq2JPAQ2V.VtWIrZyclxji3sJ5TmJchI4lIix6thG	6f9badb0d22111ec912277687a15679a
12	Eli	Galzerano	eli@plataforma5.la	$2b$10$F9KuPwFo7j0K0LQm8Ho0hucg.HnwgqSxC5Hk5VB9oRV5ApcCnTD6S	7911dbd0d22111ec912277687a15679a
13	Dani	Camargo	dani@plataforma5.la	$2b$10$3NUsXhRCwuE.nP9Lo6TE4OBPqcq2i2knZuqkgei/Io5dnYq7izZZ6	84fab7a0d22111ec912277687a15679a
14	Ema	Amico	ema@plataforma5.la	$2b$10$fp/G6Kp.kn9Bmfs8YrNQZ.HsQRqpfQJAA8tzAri2akZGOuGcIyarm	8ec54750d22111ec912277687a15679a
15	Kath	Meza	kloki@plataforma5.la	$2b$10$Z1MROwNhM.Y1rVcJJWNyReBdRyTQNNeO3FPFAIFmN9GIMiFpi3uT6	97bf4090d22111ec912277687a15679a
4	Santi	Santucho	santiagosantucho@plataforma5.la	$2b$10$JEpYEpLjBpzMsUOMs26gpeI0ciaDff3VPutCoQ1agJDJSAQ78CYUW	f23167b0d23011ec912277687a15679a
4	Test	User	testUser@plataforma5.la	$2b$10$JEpYEpLjBpzMsUOMs26gpeI0ciaDff3VPutCoQ1agJDJSAQ78CYUW	f23167b0d23011ec912277687a15679a
\.

COPY public.users (id, "firstName", "lastName", email, password, "secretKey") FROM stdin;
4	Test	User	testUser@gmail.com	$2b$10$JEpYEpLjBpzMsUOMs26gpeI0ciaDff3VPutCoQ1agJDJSAQ78CYUW	f23167b0d23011ec912277687a15679a
\.
--
-- Data for Name: users_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_roles (id, "idUser", "idRole", "idModule") FROM stdin;
1	1	1	1
2	1	1	2
3	2	1	1
4	2	1	2
5	3	1	1
6	3	1	2
7	1	1	1
8	1	1	2
9	1	2	1
10	1	2	2
11	1	3	1
12	1	3	2
\.

COPY public.users_roles (id, "idUser", "idRole", "idModule") FROM stdin;
7	4	1	1
8	4	1	2
\.
--
-- Name: courses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.courses_id_seq', 35, true);


--
-- Name: modules_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.modules_id_seq', 2, true);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 3, true);


--
-- Name: typesOfCourses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."typesOfCourses_id_seq"', 4, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 15, true);


--
-- Name: users_roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_roles_id_seq', 14, true);


--
-- Name: courses courses_cohortLabel_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT "courses_cohortLabel_key" UNIQUE ("cohortLabel");


--
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);


--
-- Name: modules modules_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modules
    ADD CONSTRAINT modules_name_key UNIQUE (name);


--
-- Name: modules modules_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modules
    ADD CONSTRAINT modules_pkey PRIMARY KEY (id);


--
-- Name: roles roles_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_name_key UNIQUE (name);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: typesOfCourses typesOfCourses_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."typesOfCourses"
    ADD CONSTRAINT "typesOfCourses_name_key" UNIQUE (name);


--
-- Name: typesOfCourses typesOfCourses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."typesOfCourses"
    ADD CONSTRAINT "typesOfCourses_pkey" PRIMARY KEY (id);


--
-- Name: typesOfCourses typesOfCourses_tag_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."typesOfCourses"
    ADD CONSTRAINT "typesOfCourses_tag_key" UNIQUE (tag);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users_roles users_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_roles
    ADD CONSTRAINT users_roles_pkey PRIMARY KEY (id);


--
-- Name: courses courses_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_type_fkey FOREIGN KEY (type) REFERENCES public."typesOfCourses"(id) ON DELETE CASCADE;


--
-- Name: users_roles users_roles_idModule_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_roles
    ADD CONSTRAINT "users_roles_idModule_fkey" FOREIGN KEY ("idModule") REFERENCES public.modules(id) ON DELETE CASCADE;


--
-- Name: users_roles users_roles_idRole_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_roles
    ADD CONSTRAINT "users_roles_idRole_fkey" FOREIGN KEY ("idRole") REFERENCES public.roles(id) ON DELETE CASCADE;


--
-- Name: users_roles users_roles_idUser_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_roles
    ADD CONSTRAINT "users_roles_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM rdsadmin;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

