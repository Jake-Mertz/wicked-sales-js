--
-- PostgreSQL database dump
--

-- Dumped from database version 10.14 (Ubuntu 10.14-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.14 (Ubuntu 10.14-0ubuntu0.18.04.1)

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

ALTER TABLE IF EXISTS ONLY public.products DROP CONSTRAINT IF EXISTS products_pkey;
ALTER TABLE IF EXISTS ONLY public.orders DROP CONSTRAINT IF EXISTS orders_pkey;
ALTER TABLE IF EXISTS ONLY public.carts DROP CONSTRAINT IF EXISTS carts_pkey;
ALTER TABLE IF EXISTS ONLY public."cartItems" DROP CONSTRAINT IF EXISTS "cartItems_pkey";
ALTER TABLE IF EXISTS public.products ALTER COLUMN "productId" DROP DEFAULT;
ALTER TABLE IF EXISTS public.orders ALTER COLUMN "orderId" DROP DEFAULT;
ALTER TABLE IF EXISTS public.carts ALTER COLUMN "cartId" DROP DEFAULT;
ALTER TABLE IF EXISTS public."cartItems" ALTER COLUMN "cartItemId" DROP DEFAULT;
DROP SEQUENCE IF EXISTS public."products_productId_seq";
DROP TABLE IF EXISTS public.products;
DROP SEQUENCE IF EXISTS public."orders_orderId_seq";
DROP TABLE IF EXISTS public.orders;
DROP SEQUENCE IF EXISTS public."carts_cartId_seq";
DROP TABLE IF EXISTS public.carts;
DROP SEQUENCE IF EXISTS public."cartItems_cartItemId_seq";
DROP TABLE IF EXISTS public."cartItems";
DROP EXTENSION IF EXISTS plpgsql;
DROP SCHEMA IF EXISTS public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: cartItems; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."cartItems" (
    "cartItemId" integer NOT NULL,
    "cartId" integer NOT NULL,
    "productId" integer NOT NULL,
    price integer NOT NULL
);


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."cartItems_cartItemId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."cartItems_cartItemId_seq" OWNED BY public."cartItems"."cartItemId";


--
-- Name: carts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.carts (
    "cartId" integer NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: carts_cartId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."carts_cartId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: carts_cartId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."carts_cartId_seq" OWNED BY public.carts."cartId";


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    "orderId" integer NOT NULL,
    "cartId" integer NOT NULL,
    name text NOT NULL,
    "creditCard" text NOT NULL,
    "shippingAddress" text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: orders_orderId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."orders_orderId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_orderId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."orders_orderId_seq" OWNED BY public.orders."orderId";


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    "productId" integer NOT NULL,
    name text NOT NULL,
    price integer NOT NULL,
    image text NOT NULL,
    "shortDescription" text NOT NULL,
    "longDescription" text NOT NULL
);


--
-- Name: products_productId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."products_productId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_productId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."products_productId_seq" OWNED BY public.products."productId";


--
-- Name: cartItems cartItemId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems" ALTER COLUMN "cartItemId" SET DEFAULT nextval('public."cartItems_cartItemId_seq"'::regclass);


--
-- Name: carts cartId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts ALTER COLUMN "cartId" SET DEFAULT nextval('public."carts_cartId_seq"'::regclass);


--
-- Name: orders orderId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN "orderId" SET DEFAULT nextval('public."orders_orderId_seq"'::regclass);


--
-- Name: products productId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN "productId" SET DEFAULT nextval('public."products_productId_seq"'::regclass);


--
-- Data for Name: cartItems; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."cartItems" ("cartItemId", "cartId", "productId", price) FROM stdin;
1	4	2	2595
2	5	2	2595
3	5	2	2595
4	5	2	2595
5	6	1	2999
6	6	2	2595
7	7	1	2999
8	7	1	2999
9	7	2	2595
10	7	1	2999
11	7	3	2900
12	7	1	2999
13	7	1	2999
14	8	3	2900
15	9	3	2900
16	9	3	2900
17	9	4	999
18	10	3	2900
19	11	3	2900
20	12	3	2900
21	13	3	2900
22	14	3	2900
23	7	1	2999
24	15	1	2999
25	15	3	2900
26	16	3	2900
27	17	1	2999
28	18	1	2999
29	19	2	1900
30	20	1	1700
31	20	2	1900
32	20	2	1900
33	20	3	1200
34	20	3	1200
35	20	3	1200
36	20	3	1200
37	21	6	1700
38	21	4	2500
39	22	6	1700
40	22	2	1900
41	22	1	1700
42	22	2	1900
43	22	3	1200
44	22	4	2500
45	22	5	1700
46	22	6	1700
47	22	1	1700
48	22	2	1900
49	22	2	1900
50	23	2	1900
51	24	1	1700
52	25	1	1700
53	25	3	1200
54	26	2	1900
55	27	2	1900
56	27	2	1900
57	27	1	1700
58	27	1	1700
59	28	2	1900
60	28	6	1700
61	29	1	1700
62	29	6	1700
63	30	6	1700
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.carts ("cartId", "createdAt") FROM stdin;
1	2020-09-29 17:17:52.522439+00
2	2020-09-29 17:24:28.987461+00
3	2020-09-29 17:25:39.428085+00
4	2020-09-29 17:34:16.623114+00
5	2020-09-29 17:38:21.03334+00
6	2020-09-29 23:24:17.479979+00
7	2020-09-30 17:00:41.037715+00
8	2020-09-30 19:23:51.440379+00
9	2020-09-30 19:26:42.129608+00
10	2020-09-30 19:50:49.328886+00
11	2020-09-30 19:55:11.686554+00
12	2020-09-30 19:55:19.451265+00
13	2020-09-30 19:56:14.910039+00
14	2020-09-30 20:01:51.26818+00
15	2020-10-01 02:16:10.162236+00
16	2020-10-01 02:40:00.557176+00
17	2020-10-01 15:25:08.264339+00
18	2020-10-01 16:03:55.567172+00
19	2020-10-01 22:14:16.12519+00
20	2020-10-01 23:26:48.015309+00
21	2020-10-02 02:40:24.879905+00
22	2020-10-02 14:21:33.413522+00
23	2020-10-02 19:46:05.112802+00
24	2020-10-02 19:57:56.292495+00
25	2020-10-02 19:58:38.070229+00
26	2020-10-02 20:24:02.193874+00
27	2020-10-02 20:27:39.09561+00
28	2020-10-02 21:06:36.509033+00
29	2020-10-07 18:29:23.833+00
30	2020-10-07 18:29:56.466455+00
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders ("orderId", "cartId", name, "creditCard", "shippingAddress", "createdAt") FROM stdin;
43	9	jake	1234567890987654	yemen	2020-09-30 19:49:23.443983+00
44	9	jake	1234567890987654	yemen	2020-09-30 19:50:04.457164+00
45	9	jake	1234567890987654	yemen	2020-09-30 19:50:22.208863+00
46	9	jake	1234567890987654	yemen	2020-09-30 19:52:08.171131+00
47	9	jake	1234567890987654	yemen	2020-09-30 19:52:53.193341+00
48	9	jake	1234567890987654	yemen	2020-09-30 19:53:14.55666+00
49	4	jake	1234567890987654	yemen	2020-09-30 19:53:28.600698+00
50	4	jake	1234567890987654	yemen	2020-09-30 19:54:11.408116+00
51	4	jake	1234567890987654	yemen	2020-09-30 19:55:04.810309+00
52	4	jake	1234567890987654	yemen	2020-09-30 19:55:14.57071+00
53	9	jake	1234567890987654	yemen	2020-09-30 19:55:34.052313+00
54	9	jake	1234567890987654	yemen	2020-09-30 19:56:18.948692+00
55	9	jake	1234567890987654	yemen	2020-09-30 19:56:26.609212+00
56	9	jake	1234567890987654	yemen	2020-09-30 19:56:41.685011+00
57	9	jake	1234567890987654	yemen	2020-09-30 19:56:43.265754+00
58	9	jake	1234567890987654	yemen	2020-09-30 19:56:44.41773+00
59	9	jake	1234567890987654	yemen	2020-09-30 19:56:45.498416+00
60	9	jake	1234567890987654	yemen	2020-09-30 19:56:46.391083+00
61	9	jake	1234567890987654	yemen	2020-09-30 19:56:47.204182+00
62	9	jake	1234567890987654	yemen	2020-09-30 19:56:47.987797+00
63	9	jake	1234567890987654	yemen	2020-09-30 19:56:48.862727+00
64	9	jake	1234567890987654	yemen	2020-09-30 19:56:49.687337+00
65	9	jake	1234567890987654	yemen	2020-09-30 19:56:50.558427+00
66	9	jake	1234567890987654	yemen	2020-09-30 19:59:21.360299+00
67	9	jake	1234567890987654	yemen	2020-09-30 20:02:09.365885+00
80	7	Jake	gfdfg	ordurrrrrrrrrrrr	2020-10-01 01:55:18.577362+00
81	15	Jake	gfdfg	ertisefeg	2020-10-01 02:17:24.314063+00
82	16				2020-10-01 02:40:13.905684+00
83	16	Jake	gfdfg	fghjk	2020-10-01 02:40:24.279777+00
84	17	Jake	gfdfg	dfghdfgh	2020-10-01 15:25:32.393461+00
85	18	Jake	tgttt	jhghjk	2020-10-01 20:13:06.072556+00
86	19				2020-10-01 22:19:46.387775+00
87	19	Jake	gfdfg	dfg	2020-10-01 22:26:55.526472+00
88	20	Jake	gfdfg	sergtrwerg	2020-10-02 02:40:17.096179+00
89	22				2020-10-02 14:21:59.83245+00
90	22				2020-10-02 17:07:53.30158+00
91	22	Jake	34543	trfesgrd	2020-10-02 19:45:45.504938+00
92	23				2020-10-02 19:48:30.937528+00
93	23				2020-10-02 19:51:40.149622+00
94	23				2020-10-02 19:57:30.720051+00
95	23				2020-10-02 19:57:33.861249+00
96	23	Jake			2020-10-02 19:57:37.087704+00
97	23	Jake	gfdfg	sdfdsdf	2020-10-02 19:57:43.970922+00
98	24	Jake			2020-10-02 19:58:03.463631+00
99	24	Jake			2020-10-02 19:58:09.27808+00
100	24	Jake	gfdfg	zxczxc	2020-10-02 19:58:27.564369+00
101	25				2020-10-02 20:01:59.87076+00
102	25				2020-10-02 20:15:35.254391+00
103	25				2020-10-02 20:15:36.731492+00
104	25				2020-10-02 20:15:47.088345+00
105	25				2020-10-02 20:15:55.645342+00
106	25	Jake			2020-10-02 20:19:09.092624+00
107	25	Jake	gfdfg		2020-10-02 20:19:12.433958+00
108	25	Jake	gfdfg	xfdgdh	2020-10-02 20:19:16.060786+00
109	26				2020-10-02 20:25:36.956324+00
110	26	Jake	gfdfg	ghhjhf	2020-10-02 20:25:43.317789+00
111	27				2020-10-02 21:04:46.6708+00
112	27	Jake	gfdfg	dfgfdfg	2020-10-02 21:05:14.38658+00
113	29	Jake	gfdfg	dfg	2020-10-07 18:29:52.398549+00
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products ("productId", name, price, image, "shortDescription", "longDescription") FROM stdin;
1	Fender Stratocaster	1700	/images2/fender-strat.png	Often copied, but never surpassed, the Stratocaster is arguably the world’s most-loved electric guitar.	Electrifying the music world since its debut in 1954, its natural, versatile sound made the Stratocaster the benchmark for exceptional guitar tones. The American Professional Stratocaster isn’t a re-imagining of the classic design; it’s the authentic original model, evolved. The choice of musical legends since its release, the Stratocaster feel and sound set the world on fire, powering music movements from electric blues to EDM, and everything in-between. In your hands this Strat is ready to navigate the creative twists and turns of your music, inspiring you to express yourself in new ways through your playing.
2	Fender Telecaster	1900	/images2/fender-telly.jpg	Leo Fender's 1952 Telecaster legitimized the electric guitar as a mainstream instrument.	The American Ultra Telecaster features a unique 'Modern D' neck profile with rolled fingerboard edges for hours of playing comfort, and the tapered neck heel allows easy access to the highest register. A speedy 10-14 compound-radius fingerboard with 22 medium-jumbo frets means effortless and accurate soloing, while the Ultra Noiseless pickups and advanced wiring options provide endless tonal possibilities, without hum. This versatile, state-of-the-art instrument will inspire you to push your playing to new heights.
3	ESP LTD Sparrowhawk Military Green Sunburst	1200	/images2/ESP-LTD-sparrowhawk.png	Bill Kelliher of the widely-respected American rock band Mastodon joined the ESP artist family in 2016.	For 2017, ESP is proud to debut the LTD Bill Kelliher Sparrowhawk, which offers set-thru construction at 24.75” scale, with mahogany body, 3-piece mahogany neck, ebony fingerboard, a TonePros locking TOM bridge and tailpiece, and Kelliher’s Lace Sensor Divinator signature pickups. The Sparrowhawk is being offered in Military Green Sunburst Satin finish. Includes hardshell case.
4	Gibson Les Paul	2500	/images2/gibson-les-paul.jpg	From its carved maple top to its stockpile of premium features, the Gibson Les Paul Standard ’60s is ready to rock. Burstbucker pickups and handwired electronics deliver a massive tone arsenal.	When it comes to capturing vintage Patent Applied For (PAF) humbucker tone, nothing beats the sound of this Les Paul Standard’s Burstbucker 61 pickups. This humbucker pays tribute to 1961, which happens to be the year Gibson started using Alnico V magnets, providing these pickups with greater touch sensitivity and high-frequency output. These magnets — along with period-correct unmatched windings on the bobbins — capture the subtle historical variations in true humbucker tone. Plug into your favorite amp, and experience smooth low-end response, complex midrange crunch, and sweet-sounding highs. These pickups sound great clean or they can be used to push your amp into overdrive for the legendary fat, snarling tone you can only get with a humbucker. Under the hood, the control assembly is handwired with matched potentiometers and Orange Drop capacitors, ensuring that you’ll hear the mellifluous voice of your Les Paul Standard ’60s in all its glory, even when you back down your volume.
5	Gibson Explorer	1700	/images2/gibson-explorer.png	The modern Gibson Explorer embodies all the trail-blazing style of the 1958 original, from its eye-catching angular body and hockey stick headstock to its red-hot rock appeal.	Gibson built the Explorer with a solid mahogany body and rosewood-topped set mahogany neck, so you know you’re in for rich tones, great sustain, and outstanding midrange character every time you plug in. The Gibson Explorer has been embraced by hard rockers the world over (and quite a few here at Sweetwater) for decades; its set-neck construction and fast-playing SlimTaper neck profile combine to give you an unbeatable sonic weapon onstage or in the studio. From the tonewoods to the rock-solid set neck to the top-shelf hardware, the Gibson Explorer was made to rock.
6	Rickenbacker 620 Deluxe	1700	/images2/rickenbacker-620-fireglo.png	The Rickenbacker 620 electric guitar offers you the unmistakable jangle of a great Ricky with the performance of a great solidbody.	The 620 was first released in the 1950s to offer budding rock 'n' rollers a great instrument to play. It has since been seen in the hands of such guitar luminaries as Mike Campbell of Tom Petty and the Heartbreakers. The 620's all-maple construction and Hi-gain single-coil pickups deliver the legendary tone that goes hand in hand with the Rickenbacker name. And the 620 even boasts the famed Rick-O-Sound stereo output for expanded sonic possibilities.
\.


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."cartItems_cartItemId_seq"', 63, true);


--
-- Name: carts_cartId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."carts_cartId_seq"', 30, true);


--
-- Name: orders_orderId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."orders_orderId_seq"', 113, true);


--
-- Name: products_productId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."products_productId_seq"', 1, false);


--
-- Name: cartItems cartItems_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems"
    ADD CONSTRAINT "cartItems_pkey" PRIMARY KEY ("cartItemId");


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY ("cartId");


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY ("orderId");


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY ("productId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

