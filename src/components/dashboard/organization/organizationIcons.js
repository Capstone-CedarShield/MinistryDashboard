import org1 from "../../../assets/organizationIcons/org1.svg";
import org2 from "../../../assets/organizationIcons/org2.svg";
import org3 from "../../../assets/organizationIcons/org3.svg";
import org4 from "../../../assets/organizationIcons/org4.svg";
import org5 from "../../../assets/organizationIcons/org5.svg";
import org6 from "../../../assets/organizationIcons/org6.svg";
import org7 from "../../../assets/organizationIcons/org7.svg";
import org8 from "../../../assets/organizationIcons/org8.svg";
import org9 from "../../../assets/organizationIcons/org9.svg";
import org10 from "../../../assets/organizationIcons/org10.svg";
import org11 from "../../../assets/organizationIcons/org11.svg";
import org12 from "../../../assets/organizationIcons/org12.svg";
import org13 from "../../../assets/organizationIcons/org13.svg";
import org14 from "../../../assets/organizationIcons/org14.svg";
import org15 from "../../../assets/organizationIcons/org15.svg";

// Organization Icon Mapping (Using organization_key)
const organizationIcons = {
  JX4Q8ZKP: org1,
  G7M2YVWX: org2,
  N9RT3LPQ: org3,
  B4F6H2JW: org4,
  W3KT9MXL: org5,
  P5J8ZVQR: org6,
  T6L9MFQP: org7,
  Q8G4MKLR: org8,
  V3LT7NQK: org9,
  Z4P9WKTL: org10,
  M2FK8VLQ: org11,
  X7J3TPLZ: org12,
  L5NK9TWM: org13,
  R3V8ZPLM: org14,
  K9W4TLQN: org15,
};

export default function getOrganizationIcon(organizationKey) {
  return organizationIcons[organizationKey] || "/placeholder.png"; // Default if not found
}
