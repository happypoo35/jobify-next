--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 16.0

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
-- Name: JobType; Type: TYPE; Schema: public; Owner: default
--

CREATE TYPE public."JobType" AS ENUM (
    'full_time',
    'part_time',
    'remote',
    'internship'
);


ALTER TYPE public."JobType" OWNER TO "default";

--
-- Name: StatusType; Type: TYPE; Schema: public; Owner: default
--

CREATE TYPE public."StatusType" AS ENUM (
    'interview',
    'declined',
    'pending'
);


ALTER TYPE public."StatusType" OWNER TO "default";

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Job; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public."Job" (
    id text NOT NULL,
    company character varying(50) NOT NULL,
    "position" character varying(100) NOT NULL,
    status public."StatusType" DEFAULT 'pending'::public."StatusType" NOT NULL,
    "jobType" public."JobType" DEFAULT 'full_time'::public."JobType" NOT NULL,
    "jobLocation" text NOT NULL,
    "userId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Job" OWNER TO "default";

--
-- Name: User; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text,
    password text NOT NULL,
    location text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO "default";

--
-- Data for Name: Job; Type: TABLE DATA; Schema: public; Owner: default
--

COPY public."Job" (id, company, "position", status, "jobType", "jobLocation", "userId", "createdAt", "updatedAt") FROM stdin;
clnhs0zd10000l008kcnbqy7l	Demimbu	Health Coach IV	pending	full_time	Luwu	clnhrb5sf0000w1sww1db0ody	2023-03-22 10:30:50	2023-10-08 18:07:19.813
clnhs0zd10001l008nwijn30c	Tagchat	Environmental Tech	declined	internship	Gālīkesh	clnhrb5sf0000w1sww1db0ody	2023-08-11 04:52:57	2023-10-08 18:07:19.813
clnhs0zd10002l008maskn30l	Tekfly	Financial Advisor	interview	internship	Leigu	clnhrb5sf0000w1sww1db0ody	2023-04-13 19:56:12	2023-10-08 18:07:19.813
clnhs0zd10003l0082v2olowo	DabZ	Registered Nurse	declined	internship	Oropesa	clnhrb5sf0000w1sww1db0ody	2023-08-14 21:16:01	2023-10-08 18:07:19.813
clnhs0zd10004l008ebtmhtbw	Brainsphere	Quality Engineer	pending	remote	Jinluo	clnhrb5sf0000w1sww1db0ody	2022-10-13 22:54:09	2023-10-08 18:07:19.813
clnhs0zd10005l008i5y4s8hk	Jayo	Occupational Therapist	interview	full_time	Morro Agudo	clnhrb5sf0000w1sww1db0ody	2023-05-23 02:25:37	2023-10-08 18:07:19.813
clnhs0zd10006l008p6cpkjwi	Abatz	Research Associate	pending	full_time	Banjar Bongangede	clnhrb5sf0000w1sww1db0ody	2023-03-13 20:57:49	2023-10-08 18:07:19.813
clnhs0zd10007l0082d4oi31n	Skyndu	Software Consultant	declined	full_time	Salamnunggal	clnhrb5sf0000w1sww1db0ody	2022-10-20 21:58:56	2023-10-08 18:07:19.813
clnhs0zd10008l008aihopoo2	Divavu	Software Consultant	declined	remote	Buenos Aires	clnhrb5sf0000w1sww1db0ody	2023-02-09 18:58:34	2023-10-08 18:07:19.813
clnhs0zd10009l008nmanthq2	Tekfly	Staff Accountant II	declined	remote	Ulluaya	clnhrb5sf0000w1sww1db0ody	2023-04-06 06:46:05	2023-10-08 18:07:19.813
clnhs0zd1000al008pt4wg8f2	Topiclounge	VP Product Management	pending	full_time	Chiri-Yurt	clnhrb5sf0000w1sww1db0ody	2022-12-30 06:22:21	2023-10-08 18:07:19.813
clnhs0zd1000bl008yfsybsxi	Twinte	Sales Representative	interview	internship	Wierzbica	clnhrb5sf0000w1sww1db0ody	2023-03-27 02:43:54	2023-10-08 18:07:19.813
clnhs0zd1000cl008gjeaf2jd	Wordpedia	Registered Nurse	interview	internship	Pāvilosta	clnhrb5sf0000w1sww1db0ody	2022-12-05 13:52:56	2023-10-08 18:07:19.813
clnhs0zd1000dl008i3isrkwf	Avaveo	Budget/Accounting Analyst III	declined	full_time	St. Anton an der Jeßnitz	clnhrb5sf0000w1sww1db0ody	2023-03-20 16:31:56	2023-10-08 18:07:19.813
clnhs0zd1000el008rz9n30fl	Kimia	Registered Nurse	interview	remote	Litibakul	clnhrb5sf0000w1sww1db0ody	2023-01-16 12:43:40	2023-10-08 18:07:19.813
clnhs0zd1000fl008flzahfgq	Dynazzy	Associate Professor	interview	remote	Fengmu	clnhrb5sf0000w1sww1db0ody	2023-04-23 05:34:28	2023-10-08 18:07:19.813
clnhs0zd1000gl008nss7fjqc	Babblestorm	VP Quality Control	interview	part_time	Geldrop	clnhrb5sf0000w1sww1db0ody	2023-05-26 13:42:42	2023-10-08 18:07:19.813
clnhs0zd1000hl008vkotxxpd	Livetube	Administrative Officer	pending	part_time	Newmarket on Fergus	clnhrb5sf0000w1sww1db0ody	2023-06-14 13:25:33	2023-10-08 18:07:19.813
clnhs0zd1000il0089xk9zyng	Dynabox	Geologist IV	declined	full_time	Zaliztsi	clnhrb5sf0000w1sww1db0ody	2022-10-18 06:55:36	2023-10-08 18:07:19.813
clnhs0zd1000jl0087vjiha1y	Dablist	Software Test Engineer II	declined	internship	Bromma	clnhrb5sf0000w1sww1db0ody	2023-03-27 08:04:07	2023-10-08 18:07:19.813
clnhs0zd1000kl008rzjb78qh	Eire	Marketing Manager	declined	full_time	Tan Sum	clnhrb5sf0000w1sww1db0ody	2023-02-27 23:45:56	2023-10-08 18:07:19.813
clnhs0zd1000ll008e3nuhauk	Feedbug	Graphic Designer	pending	part_time	Novokizhinginsk	clnhrb5sf0000w1sww1db0ody	2023-02-24 21:10:07	2023-10-08 18:07:19.813
clnhs0zd1000ml008971xb66o	Blogtag	Tax Accountant	declined	internship	Remiremont	clnhrb5sf0000w1sww1db0ody	2022-10-14 11:40:52	2023-10-08 18:07:19.813
clnhs0zd1000nl008ml5ucvas	Aimbu	Automation Specialist I	interview	part_time	Albanel	clnhrb5sf0000w1sww1db0ody	2023-09-17 17:26:13	2023-10-08 18:07:19.813
clnhs0zd1000ol0088cvitndc	Myworks	Compensation Analyst	interview	remote	Almendra	clnhrb5sf0000w1sww1db0ody	2023-01-27 09:43:39	2023-10-08 18:07:19.813
clnhs0zd1000pl008o8avea8z	Geba	Account Coordinator	pending	part_time	Gabahan	clnhrb5sf0000w1sww1db0ody	2023-03-20 22:11:56	2023-10-08 18:07:19.813
clnhs0zd1000ql008z3c8qb3w	Pixonyx	Administrative Officer	declined	internship	Talisay	clnhrb5sf0000w1sww1db0ody	2023-01-18 18:17:10	2023-10-08 18:07:19.813
clnhs0zd1000rl008gkuo6b17	Ntags	Financial Analyst	pending	part_time	Cheongsong gun	clnhrb5sf0000w1sww1db0ody	2023-06-07 03:00:15	2023-10-08 18:07:19.813
clnhs0zd1000sl008kvycyrw2	Meezzy	Registered Nurse	declined	remote	Krajan	clnhrb5sf0000w1sww1db0ody	2023-01-01 01:49:10	2023-10-08 18:07:19.813
clnhs0zd1000tl00865wxo2o6	Edgetag	VP Accounting	interview	remote	Qiping	clnhrb5sf0000w1sww1db0ody	2022-11-21 22:24:59	2023-10-08 18:07:19.813
clnhs0zd1000ul00847natv1r	Gigaclub	Account Representative II	pending	internship	Saquarema	clnhrb5sf0000w1sww1db0ody	2023-04-18 11:52:13	2023-10-08 18:07:19.813
clnhs0zd1000vl00855avt7fe	Gigashots	Internal Auditor	pending	full_time	Sukhobuzimskoye	clnhrb5sf0000w1sww1db0ody	2022-10-19 23:55:17	2023-10-08 18:07:19.813
clnhs0zd1000wl008x0xix3ly	Tavu	Environmental Specialist	interview	part_time	Skoroszyce	clnhrb5sf0000w1sww1db0ody	2023-04-24 19:22:57	2023-10-08 18:07:19.813
clnhs0zd1000xl008yy3j1wkj	Twitterbridge	Structural Engineer	declined	internship	Xinxu	clnhrb5sf0000w1sww1db0ody	2023-02-24 08:05:25	2023-10-08 18:07:19.813
clnhs0zd1000yl008gvy9nvvl	Babbleset	Help Desk Technician	interview	full_time	Xikou	clnhrb5sf0000w1sww1db0ody	2023-05-09 16:21:08	2023-10-08 18:07:19.813
clnhs0zd1000zl00870jg2n4m	Trilia	Senior Quality Engineer	interview	remote	Makbon	clnhrb5sf0000w1sww1db0ody	2023-08-15 20:30:16	2023-10-08 18:07:19.813
clnhs0zd10010l0084ez1zrt9	Trudeo	Structural Analysis Engineer	pending	internship	Daitōchō	clnhrb5sf0000w1sww1db0ody	2022-12-26 05:00:48	2023-10-08 18:07:19.813
clnhs0zd10011l008ksambm0v	Avavee	GIS Technical Architect	declined	remote	Rehnān	clnhrb5sf0000w1sww1db0ody	2023-05-14 06:24:16	2023-10-08 18:07:19.813
clnhs0zd10012l008z35besup	Twimbo	Paralegal	declined	part_time	Lávara	clnhrb5sf0000w1sww1db0ody	2023-03-03 02:37:42	2023-10-08 18:07:19.813
clnhs0zd10013l0088ofipf5b	Livetube	Account Representative II	pending	full_time	Gubin	clnhrb5sf0000w1sww1db0ody	2023-02-27 22:33:21	2023-10-08 18:07:19.813
clnhs0zd10014l008s0kufuut	Edgetag	Research Nurse	pending	full_time	Nzeto	clnhrb5sf0000w1sww1db0ody	2023-01-12 00:53:23	2023-10-08 18:07:19.813
clnhs0zd10015l008g0o2n570	Browsecat	Developer I	interview	full_time	Beppu	clnhrb5sf0000w1sww1db0ody	2022-10-12 10:45:22	2023-10-08 18:07:19.813
clnhs0zd10016l008npy667jr	Teklist	Computer Systems Analyst IV	interview	part_time	Had Kourt	clnhrb5sf0000w1sww1db0ody	2023-03-01 19:59:44	2023-10-08 18:07:19.813
clnhs0zd10017l0085vm7an0f	Topiczoom	Nuclear Power Engineer	pending	part_time	Bakar	clnhrb5sf0000w1sww1db0ody	2023-03-09 23:36:52	2023-10-08 18:07:19.813
clnhs0zd10018l008kt2anmcp	Dabfeed	Executive Secretary	pending	part_time	Pengshi	clnhrb5sf0000w1sww1db0ody	2022-10-15 20:11:23	2023-10-08 18:07:19.813
clnhs0zd10019l008usw48vhw	Meezzy	Product Engineer	declined	remote	Dabagou	clnhrb5sf0000w1sww1db0ody	2022-10-18 14:46:06	2023-10-08 18:07:19.813
clnhs0zd1001al008a6wbh3xh	Rhybox	Programmer Analyst IV	pending	remote	Göteborg	clnhrb5sf0000w1sww1db0ody	2023-03-06 14:09:45	2023-10-08 18:07:19.813
clnhs0zd1001bl008qljxmqo7	Wordpedia	Librarian	declined	internship	Vavatenina	clnhrb5sf0000w1sww1db0ody	2023-07-23 12:54:41	2023-10-08 18:07:19.813
clnhs0zd1001cl008cnn67u67	Twinder	Account Executive	pending	full_time	Trairi	clnhrb5sf0000w1sww1db0ody	2023-08-19 21:54:51	2023-10-08 18:07:19.813
clnhs0zd1001dl008aawx5aqt	Katz	Design Engineer	pending	full_time	Shihua	clnhrb5sf0000w1sww1db0ody	2022-11-17 11:28:08	2023-10-08 18:07:19.813
clnhs0zd1001el008uru6ddvq	Tazzy	Occupational Therapist	pending	part_time	Winterthur	clnhrb5sf0000w1sww1db0ody	2023-05-16 05:09:20	2023-10-08 18:07:19.813
clnhs0zd1001fl008s4ywd7t6	Agivu	VP Product Management	declined	internship	Magisterial	clnhrb5sf0000w1sww1db0ody	2022-11-20 14:48:44	2023-10-08 18:07:19.813
clnhs0zd1001gl008f4uj9qap	Feedfish	Pharmacist	pending	full_time	Ylöjärvi	clnhrb5sf0000w1sww1db0ody	2023-08-23 12:08:51	2023-10-08 18:07:19.813
clnhs0zd2001hl008yxrfdppa	Gigazoom	Structural Analysis Engineer	pending	full_time	Tuntum	clnhrb5sf0000w1sww1db0ody	2023-02-09 12:49:09	2023-10-08 18:07:19.813
clnhs0zd2001il008sg0ns3cy	Jaxworks	Design Engineer	declined	internship	Āsmār	clnhrb5sf0000w1sww1db0ody	2022-10-09 13:22:17	2023-10-08 18:07:19.813
clnhs0zd2001jl008o5l31b8k	Youfeed	Media Manager III	declined	internship	Banjar Tiga	clnhrb5sf0000w1sww1db0ody	2022-11-21 13:15:18	2023-10-08 18:07:19.813
clnhs0zd2001kl008zthh1zi3	Zoozzy	Quality Engineer	interview	full_time	Lidköping	clnhrb5sf0000w1sww1db0ody	2022-12-31 10:42:15	2023-10-08 18:07:19.813
clnhs0zd2001ll008vid7vx0d	Lajo	Dental Hygienist	interview	remote	Palapye	clnhrb5sf0000w1sww1db0ody	2022-11-28 19:48:45	2023-10-08 18:07:19.813
clnhs0zd2001ml0083koie3f0	Skalith	Administrative Officer	declined	part_time	Lagoa Seca	clnhrb5sf0000w1sww1db0ody	2023-03-02 03:53:43	2023-10-08 18:07:19.813
clnhs0zd2001nl008y0m4f3py	Linktype	Legal Assistant	pending	full_time	Kurortnyy	clnhrb5sf0000w1sww1db0ody	2023-09-10 06:38:53	2023-10-08 18:07:19.813
clnhs0zd2001ol008yc51s2rk	Leenti	Sales Associate	pending	full_time	Futang	clnhrb5sf0000w1sww1db0ody	2023-08-26 04:18:01	2023-10-08 18:07:19.813
clnhs0zd2001pl00826pce88x	Vipe	Environmental Tech	declined	part_time	Chibombo	clnhrb5sf0000w1sww1db0ody	2023-05-16 20:27:37	2023-10-08 18:07:19.813
clnhs0zd2001ql008k4p9p3u7	Skalith	Assistant Media Planner	declined	part_time	Tianyu	clnhrb5sf0000w1sww1db0ody	2023-05-27 06:51:16	2023-10-08 18:07:19.813
clnhs0zd2001rl008ssbyy7nv	Browsezoom	Community Outreach Specialist	interview	internship	Jurh	clnhrb5sf0000w1sww1db0ody	2022-11-30 10:33:05	2023-10-08 18:07:19.813
clnhs0zd2001sl008bq4jymwr	Browsetype	Professor	interview	full_time	Majan	clnhrb5sf0000w1sww1db0ody	2023-08-11 14:47:46	2023-10-08 18:07:19.813
clnhs0zd2001tl008vdki2er7	Flashset	Geological Engineer	interview	part_time	Shangzhang	clnhrb5sf0000w1sww1db0ody	2023-09-12 04:18:40	2023-10-08 18:07:19.813
clnhs0zd2001ul008cs1qx91i	Aimbu	VP Accounting	declined	internship	Sarnia	clnhrb5sf0000w1sww1db0ody	2023-01-04 23:09:39	2023-10-08 18:07:19.813
clnhs0zd2001vl008djubvdtj	JumpXS	Sales Associate	interview	remote	Ayapel	clnhrb5sf0000w1sww1db0ody	2023-04-12 11:24:13	2023-10-08 18:07:19.813
clnhs0zd2001wl0083ppssgzy	Topicstorm	Research Assistant III	declined	full_time	Xiazhai	clnhrb5sf0000w1sww1db0ody	2023-03-18 06:37:15	2023-10-08 18:07:19.813
clnhs0zd2001xl0088kjsvs98	Tazzy	Environmental Specialist	interview	internship	Kawengan	clnhrb5sf0000w1sww1db0ody	2023-08-10 03:53:04	2023-10-08 18:07:19.813
clnhs0zd2001yl008qzpkz5eb	Quamba	Executive Secretary	declined	internship	Jinchang	clnhrb5sf0000w1sww1db0ody	2022-11-20 10:02:59	2023-10-08 18:07:19.813
clnhs0zd2001zl00806n4m687	Riffpedia	Quality Engineer	declined	remote	Tha Uthen	clnhrb5sf0000w1sww1db0ody	2022-11-23 13:22:34	2023-10-08 18:07:19.813
clnhs0zd20020l008axhvhwu6	Eazzy	Geological Engineer	pending	full_time	Golomunta	clnhrb5sf0000w1sww1db0ody	2023-01-22 14:12:01	2023-10-08 18:07:19.813
clnhs0zd20021l0087i1o0jho	Topiclounge	Product Engineer	declined	full_time	Sanjiazi	clnhrb5sf0000w1sww1db0ody	2023-02-27 15:09:57	2023-10-08 18:07:19.813
clnhs0zd20022l008r10ouc3h	LiveZ	Administrative Officer	declined	part_time	Khok Sung	clnhrb5sf0000w1sww1db0ody	2022-12-24 04:03:40	2023-10-08 18:07:19.813
clnhs0zd20023l008qi3k98el	Pixonyx	Librarian	interview	full_time	Kokagax	clnhrb5sf0000w1sww1db0ody	2022-12-22 18:41:18	2023-10-08 18:07:19.813
clnhs0zd20024l008jwnlbwes	BlogXS	Automation Specialist III	pending	full_time	Gunziying	clnhrb5sf0000w1sww1db0ody	2023-02-08 10:21:19	2023-10-08 18:07:19.813
clnhs0zd20025l00899eq5o52	Skipfire	VP Accounting	declined	remote	La‘l	clnhrb5sf0000w1sww1db0ody	2023-03-29 05:32:16	2023-10-08 18:07:19.813
clnhs0zd20026l008nsetzobb	Trilia	Electrical Engineer	declined	remote	Mazatenango	clnhrb5sf0000w1sww1db0ody	2023-01-08 08:40:44	2023-10-08 18:07:19.813
clnhs0zd20027l008idb0zh4b	Demimbu	Environmental Specialist	declined	part_time	Bauru	clnhrb5sf0000w1sww1db0ody	2023-07-01 18:39:14	2023-10-08 18:07:19.813
clnhs0zd20028l008nzw14bdb	Agivu	VP Product Management	interview	remote	Três Passos	clnhrb5sf0000w1sww1db0ody	2023-01-03 21:51:35	2023-10-08 18:07:19.813
clnhs0zd20029l008hr7ahz7t	Minyx	Director of Sales	pending	remote	Chupa	clnhrb5sf0000w1sww1db0ody	2023-05-18 10:39:13	2023-10-08 18:07:19.813
clnhs0zd2002al008ctrm98uo	Feedfish	Research Assistant IV	interview	remote	Eindhoven	clnhrb5sf0000w1sww1db0ody	2023-08-28 06:30:41	2023-10-08 18:07:19.813
clnhs0zd2002bl0082vol3zr4	Roomm	VP Accounting	pending	full_time	Kiltamagh	clnhrb5sf0000w1sww1db0ody	2022-11-24 22:38:04	2023-10-08 18:07:19.813
clnhs0zd2002cl0088nospjum	Photobug	Web Designer IV	pending	full_time	Moju	clnhrb5sf0000w1sww1db0ody	2022-11-16 16:10:25	2023-10-08 18:07:19.813
clnhs0zd2002dl0086oqk1vw0	Aimbo	Analyst Programmer	pending	full_time	Portland	clnhrb5sf0000w1sww1db0ody	2023-03-15 13:20:18	2023-10-08 18:07:19.813
clnhs0zd2002el008pl5hv67q	Vinte	Physical Therapy Assistant	interview	remote	Ol’ginka	clnhrb5sf0000w1sww1db0ody	2023-04-21 13:35:27	2023-10-08 18:07:19.813
clnhs0zd2002fl008viplzvgu	Twitterworks	Senior Editor	interview	full_time	Shtip	clnhrb5sf0000w1sww1db0ody	2023-02-24 21:57:15	2023-10-08 18:07:19.813
clnhs0zd2002hl008hxxyyqk5	Jaxnation	Analyst Programmer	pending	remote	Minjian	clnhrb5sf0000w1sww1db0ody	2023-08-10 18:47:33	2023-10-08 18:07:19.813
clnhs0zd2002il008h29kairh	Meedoo	Internal Auditor	interview	internship	Keles Timur	clnhrb5sf0000w1sww1db0ody	2022-11-21 13:26:19	2023-10-08 18:07:19.813
clnhs0zd2002jl008b8kgyt69	Minyx	Health Coach III	interview	internship	Nazareth	clnhrb5sf0000w1sww1db0ody	2023-02-27 05:09:44	2023-10-08 18:07:19.813
clnhs0zd2002kl008ijkt4nwy	Browsebug	Director of Sales	declined	internship	Abhar	clnhrb5sf0000w1sww1db0ody	2022-12-06 04:12:35	2023-10-08 18:07:19.813
clnhs0zd2002ll00843nbcghj	Cogidoo	Marketing Assistant	interview	full_time	Karinë	clnhrb5sf0000w1sww1db0ody	2023-01-02 23:04:48	2023-10-08 18:07:19.813
clnhs0zd2002ml008e864y12v	Chatterpoint	VP Quality Control	declined	part_time	Ganjaran	clnhrb5sf0000w1sww1db0ody	2023-06-18 00:44:29	2023-10-08 18:07:19.813
clnhs0zd2002ol008qc4trn1c	Brightbean	Design Engineer	interview	full_time	Hamburg Harvestehude	clnhrb5sf0000w1sww1db0ody	2022-11-16 14:20:21	2023-10-08 18:07:19.813
clnhs0zd2002pl0087mcfmcdb	Gigaclub	Research Assistant II	declined	part_time	Deir Ḥannā	clnhrb5sf0000w1sww1db0ody	2022-11-09 23:28:27	2023-10-08 18:07:19.813
clnhs0zd2002ql008ow5b5kv2	Brainverse	Computer Systems Analyst II	pending	remote	Irving	clnhrb5sf0000w1sww1db0ody	2023-08-08 16:59:24	2023-10-08 18:07:19.813
clnhs0zd2002rl0080rl0qrj3	Shufflester	Nuclear Power Engineer	interview	internship	Mandōl	clnhrb5sf0000w1sww1db0ody	2023-02-15 09:31:59	2023-10-08 18:07:19.813
clnhs0zd2002gl008223q7e0m	Skalith	Desktop Support Technician	pending	remote	Nanhuang	clnhrb5sf0000w1sww1db0ody	2023-09-26 04:34:08	2023-10-10 10:31:12.542
clnhs0zd2002nl008iew4mw67	Kimia	Cost Accountant	declined	full_time	Murganhal	clnhrb5sf0000w1sww1db0ody	2023-08-16 14:13:14	2023-10-15 12:51:31.928
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: default
--

COPY public."User" (id, email, "firstName", "lastName", password, location, "createdAt", "updatedAt") FROM stdin;
clnrqg82l0000ml086zkvd8bv	test@test.com	Test	Smith Jr	$2a$10$V7mTeIpV3JnI17ztN6ZTBO7pJ7Ar0hniqY3vlS.oJMh9H08gp/cJq		2023-10-15 17:20:53.467	2023-10-15 17:22:36.32
clnhrb5sf0000w1sww1db0ody	johnsmith@gmail.com	Johnathan	Smith	$2a$10$g0goi0KH1W2sVl7mg16QbuD3P4lWpJURD0CEKP4TPb6eMNnH8jF56	Aspen	2023-10-08 17:47:15.044	2023-10-27 13:49:39.131
\.


--
-- Name: Job Job_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Job"
    ADD CONSTRAINT "Job_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: default
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: Job Job_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Job"
    ADD CONSTRAINT "Job_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

