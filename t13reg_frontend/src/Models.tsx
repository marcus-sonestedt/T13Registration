

export class DriverInfo {
    lic_no: string = "";
    full_name: string = ""
    gender: string = "X";
    club_id: number = 1;
    kart_class_id: number = 0;
    kart_number: number = 0;
    fee_id: number = 0;
}

export class Club {
    id: number = 0;
    name: string = "";
    kcv: boolean = false;
}

export class KartClass {
    id: number = 0;
    name: string = "";
    free: boolean = false;
}

export class Fee {
    id: number = 0;
    name: string = "";
    amount: number = 0;
}
