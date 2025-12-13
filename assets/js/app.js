// سیستم مدیریت داده‌ها با localStorage
const AppData = {
    // دریافت داده‌ها از localStorage
    getData: function(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    },

    // ذخیره داده‌ها در localStorage
    saveData: function(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },

    // مدیریت بیماران
    patients: {
        getAll: function() {
            return AppData.getData('patients') || [];
        },
        add: function(patient) {
            const patients = this.getAll();
            const newPatient = {
                id: Date.now().toString(),
                phone: patient.phone,
                name: patient.name,
                createdAt: new Date().toISOString()
            };
            patients.push(newPatient);
            AppData.saveData('patients', patients);
            return newPatient;
        },
        findByPhone: function(phone) {
            return this.getAll().find(p => p.phone === phone);
        },
        findById: function(id) {
            return this.getAll().find(p => p.id === id);
        }
    },

    // مدیریت آزمایش‌ها
    tests: {
        getAll: function() {
            return AppData.getData('tests') || [];
        },
        add: function(test) {
            const tests = this.getAll();
            const newTest = {
                id: Date.now().toString(),
                patientId: test.patientId,
                patientName: test.patientName,
                patientPhone: test.patientPhone,
                testName: test.testName || 'آزمایش عمومی',
                fileUrl: test.fileUrl,
                fileType: test.fileType,
                fileName: test.fileName,
                createdAt: new Date().toISOString(),
                status: 'completed'
            };
            tests.push(newTest);
            AppData.saveData('tests', tests);
            return newTest;
        },
        findByPatientPhone: function(phone) {
            return this.getAll().filter(t => t.patientPhone === phone);
        },
        findById: function(id) {
            return this.getAll().find(t => t.id === id);
        }
    },

    // مدیریت کدهای تایید
    verificationCodes: {
        generate: function(phone) {
            const code = Math.floor(1000 + Math.random() * 9000).toString();
            const codes = AppData.getData('verificationCodes') || {};
            codes[phone] = {
                code: code,
                expiresAt: Date.now() + 10 * 60 * 1000 // 10 دقیقه
            };
            AppData.saveData('verificationCodes', codes);
            return code;
        },
        verify: function(phone, code) {
            const codes = AppData.getData('verificationCodes') || {};
            const codeData = codes[phone];
            if (!codeData) return false;
            if (Date.now() > codeData.expiresAt) return false;
            return codeData.code === code;
        }
    },

    // مدیریت جلسه کاربر
    session: {
        set: function(userType, data) {
            const session = {
                userType: userType,
                data: data,
                loginTime: new Date().toISOString()
            };
            AppData.saveData('session', session);
        },
        get: function() {
            return AppData.getData('session');
        },
        clear: function() {
            localStorage.removeItem('session');
        },
        isAdmin: function() {
            const session = this.get();
            return session && session.userType === 'admin';
        },
        isPatient: function() {
            const session = this.get();
            return session && session.userType === 'patient';
        }
    }
};

// تبدیل فایل به Base64
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// نمایش پیام
function showMessage(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`;
    alertDiv.style.zIndex = '9999';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(alertDiv);
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// بررسی لاگین بودن کاربر
function checkAuth(requiredType) {
    const session = AppData.session.get();
    if (!session || session.userType !== requiredType) {
        if (requiredType === 'admin') {
            window.location.href = 'admin-login.html';
        } else {
            window.location.href = 'patient-login.html';
        }
        return false;
    }
    return true;
}

