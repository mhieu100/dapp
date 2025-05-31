-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 31, 2025 at 07:32 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `centers`
--

CREATE TABLE `centers` (
  `center_id` bigint(20) NOT NULL,
  `address` varchar(255) NOT NULL,
  `capacity` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `working_hours` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `centers`
--

INSERT INTO `centers` (`center_id`, `address`, `capacity`, `image`, `name`, `phone_number`, `working_hours`) VALUES
(1, 'Hà Nội', 50, '1746612632482-demo.png', 'Trung Tâm Hà Nội', '0388335841', '8:00 - 17:00'),
(2, 'Hồ Chí Minh', 10, '1746554490022-trung_tam.png', 'Trung Tâm Hồ Chí Minh', '0388335845', '8:00 - 17:00'),
(4, 'To 7, Mieu Bong, Hoa Phuoc, Hoa Vang', 123, '1748570712028-cato.png', 'demo', '123', '123');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` bigint(20) NOT NULL,
  `appointment_hash` varchar(255) DEFAULT NULL,
  `payment_date_time` datetime(6) DEFAULT NULL,
  `payment_hash` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `appointment_hash`, `payment_date_time`, `payment_hash`) VALUES
(1, '0x99c4bd1921e2cab5b6c16070dde37cabcb8dce4a03fdc38ab990f920c9915d96', '2025-05-27 13:33:12.000000', '0x3e7f9733ddadc9f7527066776aac53410d4ba092335affda4407d66cf4808980'),
(2, '0x382b912238d4385450677664df97aa70a6c4933ec3ec80d829b2d4a4e4893ece', '2025-05-30 06:17:48.000000', '0x0a8e7188240a6859efdf8ed53088bf06d9885e69d91a34c04fdf39ff5a0942ed');

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) NOT NULL,
  `api_path` varchar(255) NOT NULL,
  `method` varchar(255) NOT NULL,
  `module` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `api_path`, `method`, `module`, `name`) VALUES
(1, '/appointments', 'GET', 'APPOINTMENT', 'Get all appointments of center'),
(2, '/appointments/{id}', 'PUT', 'APPOINTMENT', 'Update a appointment of cashier'),
(3, '/appointments/{id}/cancel', 'PUT', 'APPOINTMENT', 'Cancel a appointment'),
(4, '/appointments/{id}/complete', 'PUT', 'APPOINTMENT', 'Complete a appointment'),
(5, '/appointments/cash', 'POST', 'APPOINTMENT', 'Create a appointments with cash'),
(6, '/appointments/credit-card', 'POST', 'APPOINTMENT', 'Create a appointments with credit card'),
(7, '/appointments/update-payment', 'POST', 'APPOINTMENT', 'Update status of payment'),
(8, '/appointments/my-schedule', 'GET', 'APPOINTMENT', 'Get all appointments of doctor'),
(9, '/auth/account', 'GET', 'AUTH', 'Access profile'),
(10, '/auth/my-appointments', 'GET', 'AUTH', 'Get all appointments of user'),
(11, '/centers', 'POST', 'CENTER', 'Create a center'),
(12, '/centers/{id}', 'GET', 'CENTER', 'Get a center by id'),
(13, '/centers/{id}', 'PUT', 'CENTER', 'Update a center'),
(14, '/centers/{id}', 'DELETE', 'CENTER', 'Delete a center'),
(15, '/vaccines', 'POST', 'VACCINE', 'Create a vaccine'),
(16, '/vaccines/{id}', 'GET', 'VACCINE', 'Get a vaccine by id'),
(17, '/vaccines/{id}', 'PUT', 'VACCINE', 'Update a vaccine'),
(18, '/vaccines/{id}', 'DELETE', 'VACCINE', 'Delete a vaccine'),
(19, '/permissions', 'POST', 'PERMISSION', 'Create a permission'),
(20, '/permissions', 'GET', 'PERMISSION', 'Get all permissions'),
(21, '/permissions', 'PUT', 'PERMISSION', 'Update a permission'),
(22, '/permissions/{id}', 'DELETE', 'PERMISSION', 'Delete a permission'),
(23, '/users/{walletAddress}', 'PUT', 'USER', 'Update a user'),
(24, '/users/{walletAddress}', 'DELETE', 'USER', 'Delete a user'),
(25, '/users', 'GET', 'USER', 'Get all users'),
(26, '/users/doctors', 'GET', 'USER', 'Get all doctors of center'),
(27, '/roles', 'GET', 'ROLE', 'Get all roles'),
(28, '/roles/{id}', 'PUT', 'ROLE', 'Update a role'),
(29, '/files', 'GET', 'FILE', 'Upload a file'),
(30, '/appointment/vetify', 'POST', 'APPOINTMENT', 'Vetify a appointment');

-- --------------------------------------------------------

--
-- Table structure for table `permission_role`
--

CREATE TABLE `permission_role` (
  `role_id` bigint(20) NOT NULL,
  `permission_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `permission_role`
--

INSERT INTO `permission_role` (`role_id`, `permission_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(1, 9),
(1, 10),
(1, 11),
(1, 12),
(1, 13),
(1, 14),
(1, 15),
(1, 16),
(1, 17),
(1, 18),
(1, 19),
(1, 20),
(1, 21),
(1, 22),
(1, 23),
(1, 24),
(1, 25),
(1, 26),
(1, 27),
(1, 28),
(1, 29);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'ADMIN'),
(2, 'PATIENT'),
(3, 'DOCTOR'),
(4, 'CASHIER');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `wallet_address` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `is_deleted` bit(1) NOT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `center_id` bigint(20) DEFAULT NULL,
  `role_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`wallet_address`, `address`, `birthday`, `email`, `fullname`, `is_deleted`, `phone_number`, `center_id`, `role_id`) VALUES
('0x0Ddf0365768A844316078B093aAF54f2b0830757', 'To 7, Mieu Bong, Hoa Phuoc, Hoa Vang', '2025-05-12', 'hieunguyen@gmail.com', 'Nguyen Hieu', b'0', '0388335845', NULL, 2),
('0x46B1324D1c9A80D02C7d9935aC8B541224051124', 'To 7, Mieu Bong, Hoa Phuoc, Hoa Vang', '2025-05-27', 'hieutm@gmail.com', 'Tran Minh Hieu', b'0', '0388335866', 2, 3),
('0x50803992C2Fc89952C237577020c9f51523519fc', 'To 7, Mieu Bong, Hoa Phuoc, Hoa Vang', '2025-05-05', 'hoangtd@gmail.com', 'Hoang Tran Duy', b'0', '0388335867', 1, 3),
('0x56205409E70611ECc732757813a631e07cAC2648', 'To 7, Mieu Bong, Hoa Phuoc, Hoa Vang', '2025-05-13', 'thuydn@gmail.com', 'Doan Ngoc Thuy', b'0', '032312', 2, 4),
('0x672DF7fDcf5dA93C30490C7d49bd6b5bF7B4D32C', 'da nang 1', '2025-05-24', 'admin@gmail.com', 'I\'m admin', b'0', '03882212313', NULL, 1),
('0xa487d0c4Cecc6a27bEC6c5FD74E6a10F263343B5', 'To 7, Mieu Bong, Hoa Phuoc, Hoa Vang', '2025-05-22', 'patient1@gmail.com', 'I\'m patient', b'0', '0388338545', NULL, 2),
('0xCE8CC19D6a9b0C3a67E45B12D7f2AA1CDF74C83B', NULL, NULL, 'hongnt@gmail.com', 'Nguyen Thi Hong', b'0', NULL, 1, 4);

-- --------------------------------------------------------

--
-- Table structure for table `vaccines`
--

CREATE TABLE `vaccines` (
  `vaccine_id` bigint(20) NOT NULL,
  `country` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `disease` varchar(255) NOT NULL,
  `dosage` int(11) NOT NULL,
  `efficacy` varchar(255) NOT NULL,
  `is_deleted` bit(1) NOT NULL,
  `manufacturer` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `schedule` varchar(255) DEFAULT NULL,
  `stock_quantity` int(11) NOT NULL,
  `target` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vaccines`
--

INSERT INTO `vaccines` (`vaccine_id`, `country`, `description`, `disease`, `dosage`, `efficacy`, `is_deleted`, `manufacturer`, `name`, `price`, `schedule`, `stock_quantity`, `target`) VALUES
(1, 'Anh / Ấn Độ', 'R21/Matrix-M is a vaccine produced by Đại học Oxford / Serum Institute in Anh / Ấn Độ, used for Sốt rét (Malaria), recommended for Trẻ em, with a schedule of 3 liều + 1 liều nhắc lại and efficacy of 75%.', 'Sốt rét (Malaria)', 3, '75%', b'0', 'Đại học Oxford / Serum Institute', 'R21/Matrix-M', '75000', '3 liều + 1 liều nhắc lại', 23, 'Trẻ em'),
(2, 'Anh', 'RTS,S/AS01 (Mosquirix) is a vaccine produced by GlaxoSmithKline (GSK) in Anh, used for Sốt rét (Malaria), recommended for Trẻ em, with a schedule of 4 liều and efficacy of 30–55%.', 'Sốt rét (Malaria)', 4, '30–55%', b'0', 'GlaxoSmithKline (GSK)', 'RTS,S/AS01 (Mosquirix)', '125000', '4 liều', 86, 'Trẻ em'),
(3, 'Ấn Độ', 'MenAfriVac is a vaccine produced by Serum Institute of India in Ấn Độ, used for Viêm màng não mô cầu nhóm A, recommended for Trẻ em, with a schedule of 1 liều cho người 9 tháng – 29 tuổi and efficacy of >94%.', 'Viêm màng não mô cầu nhóm A', 1, '>94%', b'0', 'Serum Institute of India', 'MenAfriVac', '12500', '1 liều cho người 9 tháng – 29 tuổi', 17, 'Trẻ em'),
(4, 'Bỉ / Anh', 'Rotarix is a vaccine produced by GlaxoSmithKline (GSK) in Bỉ / Anh, used for Tiêu chảy do Rotavirus, recommended for Trẻ em, with a schedule of 2 liều uống (2 và 4 tháng tuổi) and efficacy of 60–90%.', 'Tiêu chảy do Rotavirus', 2, '60–90%', b'0', 'GlaxoSmithKline (GSK)', 'Rotarix', '125000', '2 liều uống (2 và 4 tháng tuổi)', 96, 'Trẻ em'),
(5, 'Mỹ', 'Rotateq is a vaccine produced by Merck in Mỹ, used for Tiêu chảy do Rotavirus, recommended for Trẻ em, with a schedule of 3 liều uống (2, 4, 6 tháng tuổi) and efficacy of 60–90%.', 'Tiêu chảy do Rotavirus', 3, '60–90%', b'0', 'Merck', 'Rotateq', '125000', '3 liều uống (2, 4, 6 tháng tuổi)', 79, 'Trẻ em'),
(6, 'Ấn Độ', 'Typbar-TCV is a vaccine produced by Bharat Biotech in Ấn Độ, used for Thương hàn (Typhoid), recommended for Trẻ em, with a schedule of 1 liều từ 6 tháng tuổi trở lên and efficacy of >90%.', 'Thương hàn (Typhoid)', 1, '>90%', b'0', 'Bharat Biotech', 'Typbar-TCV', '75000', '1 liều từ 6 tháng tuổi trở lên', 22, 'Trẻ em'),
(7, 'Pháp', 'Typhim Vi is a vaccine produced by Sanofi Pasteur in Pháp, used for Thương hàn (Typhoid), recommended for Trẻ em, with a schedule of 1 liều từ 2 tuổi trở lên, nhắc lại mỗi 3 năm and efficacy of ~55%.', 'Thương hàn (Typhoid)', 1, '~55%', b'0', 'Sanofi Pasteur', 'Typhim Vi', '75000', '1 liều từ 2 tuổi trở lên, nhắc lại mỗi 3 năm', 94, 'Trẻ em'),
(8, 'Mỹ', 'Gardasil 9 is a vaccine produced by Merck in Mỹ, used for HPV (ung thư cổ tử cung, mụn cóc sinh dục), recommended for Người lớn, with a schedule of 2–3 liều tùy độ tuổi and efficacy of >90%.', 'HPV (ung thư cổ tử cung, mụn cóc sinh dục)', 3, '>90%', b'0', 'Merck', 'Gardasil 9', '3250000', '2–3 liều tùy độ tuổi', 86, 'Người lớn'),
(9, 'Anh', 'Cervarix is a vaccine produced by GlaxoSmithKline (GSK) in Anh, used for HPV (ung thư cổ tử cung), recommended for Người lớn, with a schedule of 2–3 liều tùy độ tuổi and efficacy of >90%.', 'HPV (ung thư cổ tử cung)', 3, '>90%', b'0', 'GlaxoSmithKline (GSK)', 'Cervarix', '3250000', '2–3 liều tùy độ tuổi', 68, 'Người lớn'),
(10, 'Mỹ', 'Prevnar 13 (PCV13) is a vaccine produced by Pfizer in Mỹ, used for Viêm phổi, viêm màng não do phế cầu khuẩn, recommended for Trẻ em, with a schedule of 4 liều (2, 4, 6, 12–15 tháng tuổi) and efficacy of >80%.', 'Viêm phổi, viêm màng não do phế cầu khuẩn', 4, '>80%', b'0', 'Pfizer', 'Prevnar 13 (PCV13)', '2500000', '4 liều (2, 4, 6, 12–15 tháng tuổi)', 4, 'Trẻ em'),
(11, 'Mỹ', 'Vaxneuvance (PCV15) is a vaccine produced by Merck in Mỹ, used for Viêm phổi, viêm màng não do phế cầu khuẩn, recommended for Trẻ em, with a schedule of 4 liều (2, 4, 6, 12–15 tháng tuổi) and efficacy of >80%.', 'Viêm phổi, viêm màng não do phế cầu khuẩn', 4, '>80%', b'0', 'Merck', 'Vaxneuvance (PCV15)', '2500000', '4 liều (2, 4, 6, 12–15 tháng tuổi)', 75, 'Trẻ em'),
(12, 'Trung Quốc', 'Convidecia (Ad5-nCoV) is a vaccine produced by CanSino Biologics in Trung Quốc, used for COVID-19, recommended for Người lớn, with a schedule of 1 liều (tiêm bắp hoặc dạng hít) and efficacy of 65.7%.', 'COVID-19', 1, '65.7%', b'0', 'CanSino Biologics', 'Convidecia (Ad5-nCoV)', '250000', '1 liều (tiêm bắp hoặc dạng hít)', 62, 'Người lớn'),
(13, 'Mỹ / Đức', 'Comirnaty (Pfizer) is a vaccine produced by Pfizer/BioNTech in Mỹ / Đức, used for COVID-19, recommended for Người lớn, with a schedule of 2 liều + nhắc lại and efficacy of ~95%.', 'COVID-19', 2, '~95%', b'0', 'Pfizer/BioNTech', 'Comirnaty (Pfizer)', '750000', '2 liều + nhắc lại', 59, 'Người lớn'),
(14, 'Mỹ', 'Spikevax (Moderna) is a vaccine produced by Moderna in Mỹ, used for COVID-19, recommended for Người lớn, with a schedule of 2 liều + nhắc lại and efficacy of ~94%.', 'COVID-19', 2, '~94%', b'0', 'Moderna', 'Spikevax (Moderna)', '750000', '2 liều + nhắc lại', 17, 'Người lớn'),
(15, 'Anh', 'Shingrix is a vaccine produced by GlaxoSmithKline (GSK) in Anh, used for Zona (giời leo), recommended for Người lớn, with a schedule of 2 liều cách nhau 2–6 tháng and efficacy of >90%.', 'Zona (giời leo)', 2, '>90%', b'0', 'GlaxoSmithKline (GSK)', 'Shingrix', '3500000', '2 liều cách nhau 2–6 tháng', 83, 'Người lớn'),
(16, 'Mỹ', 'Zostavax is a vaccine produced by Merck in Mỹ, used for Zona (giời leo), recommended for Người lớn, with a schedule of 1 liều cho người ≥60 tuổi and efficacy of ~51%.', 'Zona (giời leo)', 1, '~51%', b'0', 'Merck', 'Zostavax', '5000000', '1 liều cho người ≥60 tuổi', 55, 'Người lớn'),
(17, 'Pháp', 'Fluzone High-Dose is a vaccine produced by Sanofi Pasteur in Pháp, used for Cúm mùa, recommended for Người lớn, with a schedule of 1 liều hàng năm cho người ≥65 tuổi and efficacy of ~24% hiệu quả hơn.', 'Cúm mùa', 1, '~24% hiệu quả hơn', b'0', 'Sanofi Pasteur', 'Fluzone High-Dose', '1250000', '1 liều hàng năm cho người ≥65 tuổi', 50, 'Người lớn'),
(18, 'Đức / Anh', 'Fluarix Quadrivalent is a vaccine produced by GlaxoSmithKline (GSK) in Đức / Anh, used for Cúm mùa, recommended for Trẻ em, with a schedule of 1 liều hàng năm cho người ≥6 tháng tuổi and efficacy of 40–60%.', 'Cúm mùa', 1, '40–60%', b'0', 'GlaxoSmithKline (GSK)', 'Fluarix Quadrivalent', '750000', '1 liều hàng năm cho người ≥6 tháng tuổi', 15, 'Trẻ em'),
(19, 'Pháp', 'Menactra is a vaccine produced by Sanofi Pasteur in Pháp, used for Viêm màng não mô cầu nhóm A, C, W, Y, recommended for Trẻ em, with a schedule of 2 liều (11–12 tuổi và 16 tuổi) and efficacy of >85%.', 'Viêm màng não mô cầu nhóm A, C, W, Y', 2, '>85%', b'0', 'Sanofi Pasteur', 'Menactra', '2500000', '2 liều (11–12 tuổi và 16 tuổi)', 35, 'Trẻ em'),
(20, 'Anh', 'Menveo is a vaccine produced by GlaxoSmithKline (GSK) in Anh, used for Viêm màng não mô cầu nhóm A, C, W, Y, recommended for Trẻ em, with a schedule of 2 liều (11–12 tuổi và 16 tuổi) and efficacy of >85%.', 'Viêm màng não mô cầu nhóm A, C, W, Y', 2, '>85%', b'0', 'GlaxoSmithKline (GSK)', 'Menveo', '2500000', '2 liều (11–12 tuổi và 16 tuổi)', 62, 'Trẻ em'),
(21, 'Mỹ', 'Trumenba is a vaccine produced by Pfizer in Mỹ, used for Viêm màng não mô cầu nhóm B, recommended for Người lớn, with a schedule of 2–3 liều tùy nguy cơ and efficacy of >80%.', 'Viêm màng não mô cầu nhóm B', 3, '>80%', b'0', 'Pfizer', 'Trumenba', '2875000', '2–3 liều tùy nguy cơ', 76, 'Người lớn'),
(22, 'Ý / Anh', 'Bexsero is a vaccine produced by GlaxoSmithKline (GSK) in Ý / Anh, used for Viêm màng não mô cầu nhóm B, recommended for Trẻ em, with a schedule of 2–3 liều tùy nguy cơ and efficacy of >80%.', 'Viêm màng não mô cầu nhóm B', 3, '>80%', b'0', 'GlaxoSmithKline (GSK)', 'Bexsero', '4000000', '2–3 liều tùy nguy cơ', 28, 'Trẻ em'),
(23, 'Đan Mạch', 'Jynneos is a vaccine produced by Bavarian Nordic in Đan Mạch, used for Đậu mùa và đậu khỉ (Monkeypox), recommended for Người lớn, with a schedule of 2 liều cách nhau 4 tuần and efficacy of ~85%.', 'Đậu mùa và đậu khỉ (Monkeypox)', 2, '~85%', b'0', 'Bavarian Nordic', 'Jynneos', '2875000', '2 liều cách nhau 4 tuần', 24, 'Người lớn'),
(24, 'Mỹ', 'ACAM2000 is a vaccine produced by Emergent BioSolutions in Mỹ, used for Đậu mùa, recommended for Người lớn, with a schedule of 1 liều and efficacy of ~95%.', 'Đậu mùa', 1, '~95%', b'0', 'Emergent BioSolutions', 'ACAM2000', '2500000', '1 liều', 22, 'Người lớn'),
(25, 'Đức', 'RabAvert is a vaccine produced by GlaxoSmithKline (GSK) in Đức, used for Dại, recommended for Người lớn, with a schedule of 5 liều sau phơi nhiễm and efficacy of ~100%.', 'Dại', 5, '~100%', b'0', 'GlaxoSmithKline (GSK)', 'RabAvert', '7500000', '5 liều sau phơi nhiễm', 85, 'Người lớn'),
(26, 'Pháp', 'Imovax Rabies is a vaccine produced by Sanofi Pasteur in Pháp, used for Dại, recommended for Người lớn, with a schedule of 5 liều sau phơi nhiễm and efficacy of ~100%.', 'Dại', 5, '~100%', b'0', 'Sanofi Pasteur', 'Imovax Rabies', '7500000', '5 liều sau phơi nhiễm', 30, 'Người lớn'),
(27, 'Mỹ', 'Vaxchora is a vaccine produced by PaxVax in Mỹ, used for Tả, recommended for Người lớn, with a schedule of 1 liều uống and efficacy of ~90%.', 'Tả', 1, '~90%', b'0', 'PaxVax', 'Vaxchora', '6250000', '1 liều uống', 32, 'Người lớn'),
(28, 'Áo', 'IXIARO is a vaccine produced by Valneva in Áo, used for Viêm não Nhật Bản, recommended for Trẻ em, with a schedule of 2 liều cách nhau 28 ngày and efficacy of ~96%.', 'Viêm não Nhật Bản', 2, '~96%', b'0', 'Valneva', 'IXIARO', '7500000', '2 liều cách nhau 28 ngày', 34, 'Trẻ em'),
(29, 'Thụy Sĩ / Mỹ', 'Vivotif is a vaccine produced by PaxVax in Thụy Sĩ / Mỹ, used for Thương hàn (Typhoid), recommended for Người lớn, with a schedule of 4 viên uống trong 1 tuần and efficacy of ~70%.', 'Thương hàn (Typhoid)', 2, '~70%', b'0', 'PaxVax', 'Vivotif', '1250000', '4 viên uống trong 1 tuần', 29, 'Người lớn'),
(30, 'Mỹ', 'Heplisav-B is a vaccine produced by Dynavax Technologies in Mỹ, used for Viêm gan B, recommended for Người lớn, with a schedule of 2 liều cách nhau 1 tháng and efficacy of ~95%.', 'Viêm gan B', 2, '~95%', b'0', 'Dynavax Technologies', 'Heplisav-B', '2875000', '2 liều cách nhau 1 tháng', 57, 'Người lớn'),
(33, 'Demo', 'Demo', '3 lieu', 100000, 'Trẻ em', b'0', 'VN', 'VC1', '200', '60', 0, '10'),
(34, 'demo', 'demo', 'demo', 10000, 'demo', b'0', 'demo', 'demo', '10', '100', 0, 'demo'),
(35, 'dem', 'demo', '2 lieu', 100000, 'demo', b'0', 'demo', 'demo 1', '100', '100', 0, '100'),
(36, 'dmeo', 'demo', '10', 10000, 'demo', b'0', 'demo', 'demo123', '1000', '10', 0, 'demo'),
(37, 'demo', 'dmeo', '100', 10000, 'dmeo', b'0', 'demo', 'demo456', '100', '100', 0, 'deom');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `centers`
--
ALTER TABLE `centers`
  ADD PRIMARY KEY (`center_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `permission_role`
--
ALTER TABLE `permission_role`
  ADD KEY `FK6mg4g9rc8u87l0yavf8kjut05` (`permission_id`),
  ADD KEY `FK3vhflqw0lwbwn49xqoivrtugt` (`role_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`wallet_address`),
  ADD KEY `FK3f50dcyg88bl203une7wso2x4` (`center_id`),
  ADD KEY `FKp56c1712k691lhsyewcssf40f` (`role_id`);

--
-- Indexes for table `vaccines`
--
ALTER TABLE `vaccines`
  ADD PRIMARY KEY (`vaccine_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `centers`
--
ALTER TABLE `centers`
  MODIFY `center_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `vaccines`
--
ALTER TABLE `vaccines`
  MODIFY `vaccine_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `permission_role`
--
ALTER TABLE `permission_role`
  ADD CONSTRAINT `FK3vhflqw0lwbwn49xqoivrtugt` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  ADD CONSTRAINT `FK6mg4g9rc8u87l0yavf8kjut05` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `FK3f50dcyg88bl203une7wso2x4` FOREIGN KEY (`center_id`) REFERENCES `centers` (`center_id`),
  ADD CONSTRAINT `FKp56c1712k691lhsyewcssf40f` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
